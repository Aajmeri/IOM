using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;
using IOM.Service.Helpers;
using Microsoft.Extensions.Configuration;

namespace IOM.Service.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly IPaymentService _paymentService;

        public OrderService(IUnitOfWork unitOfWork, IConfiguration configuration, IPaymentService paymentService)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _paymentService = paymentService;
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            return await _unitOfWork.Orders.GetAllWithDetailsAsync();
        }

        public async Task<IEnumerable<Order>> GetByClientId(Guid clientId)
        {
            return await _unitOfWork.Orders.GetByClientIdAsync(clientId);
        }

        public async Task<Order> GetById(Guid id)
        {
            return await _unitOfWork.Orders.GetByIdWithDetailsAsync(id);
        }

        public async Task<(Order order, string error)> CreateOrder(
            Guid clientId,
            DateTime scheduledDate,
            string notes,
            IEnumerable<(Guid productId, int quantity)> items,
            CardDetails card)
        {
            if (card == null)
            {
                return (null, "Payment details are required.");
            }

            var (order, error) = await BuildNewOrder(clientId, scheduledDate, notes, items);
            if (error != null)
            {
                return (null, error);
            }

            // The amount charged is always computed here from the snapshotted line prices - never
            // taken from the client - and the card is only charged once every other check above
            // has passed, so a validation failure never leaves a charge behind.
            var amount = OrderTotal(order);
            var charge = await _paymentService.ChargeAsync(amount, card, order.Number);
            if (!charge.Succeeded)
            {
                return (null, $"Payment failed: {charge.DeclineReason}");
            }

            order.Payment = NewPayment(order, amount, charge, card);

            try
            {
                await _unitOfWork.Orders.AddAsync(order);
                await _unitOfWork.CommitAsync();
            }
            catch
            {
                // The card was charged but the order couldn't be saved - give the money back
                // rather than leave the client paying for an order that doesn't exist.
                await _paymentService.RefundAsync(charge.TransactionId, amount);
                throw;
            }

            var created = await _unitOfWork.Orders.GetByIdWithDetailsAsync(order.Id);
            return (created, null);
        }

        public async Task<(Order order, string error)> CreateOrderPayLater(
            Guid clientId,
            DateTime scheduledDate,
            string notes,
            IEnumerable<(Guid productId, int quantity)> items)
        {
            var (order, error) = await BuildNewOrder(clientId, scheduledDate, notes, items);
            if (error != null)
            {
                return (null, error);
            }

            await _unitOfWork.Orders.AddAsync(order);
            await _unitOfWork.CommitAsync();

            var created = await _unitOfWork.Orders.GetByIdWithDetailsAsync(order.Id);
            return (created, null);
        }

        public async Task<(Order order, string error)> PayOrder(Order order, CardDetails card)
        {
            if (card == null)
            {
                return (null, "Payment details are required.");
            }

            if (order.Payment != null)
            {
                return (null, "This order has already been paid.");
            }

            if (order.Status != OrderStatus.Pending && order.Status != OrderStatus.Approved)
            {
                return (null, "Only pending or approved orders can be paid.");
            }

            // Charged from the lines' snapshotted UnitPrice (the price when the order was placed
            // or the line was added), not today's product price - see OrderItem.UnitPrice.
            var amount = OrderTotal(order);
            var charge = await _paymentService.ChargeAsync(amount, card, order.Number);
            if (!charge.Succeeded)
            {
                return (null, $"Payment failed: {charge.DeclineReason}");
            }

            order.Payment = NewPayment(order, amount, charge, card);
            order.UpdatedDate = DateTime.UtcNow;

            try
            {
                await _unitOfWork.CommitAsync();
            }
            catch
            {
                await _paymentService.RefundAsync(charge.TransactionId, amount);
                throw;
            }

            var paid = await _unitOfWork.Orders.GetByIdWithDetailsAsync(order.Id);
            return (paid, null);
        }

        public async Task<(Order order, string error)> RescheduleOrder(Order order, DateTime newScheduledDate, string reason)
        {
            if (order.Status != OrderStatus.Pending && order.Status != OrderStatus.Approved)
            {
                return (null, "Only pending or approved orders can be rescheduled.");
            }

            if (order.ScheduledDate == newScheduledDate)
            {
                return (null, "The order is already scheduled for that time.");
            }

            // Same rules a client booking faces (aligned slot, lead time, advance window,
            // capacity). This order never counts against the new slot's capacity, since it is
            // never already in that slot (checked above).
            var slotError = await ValidateSlot(newScheduledDate);
            if (slotError != null)
            {
                return (null, slotError);
            }

            order.ScheduledDate = newScheduledDate;
            if (!string.IsNullOrWhiteSpace(reason))
            {
                order.AdminNotes = reason.Trim();
            }
            order.UpdatedDate = DateTime.UtcNow;
            await _unitOfWork.CommitAsync();

            return (order, null);
        }

        // Shared by both checkout paths: validates items and slot, loads the products and builds
        // an unsaved Pending order with each line's UnitPrice snapshotted from the current price.
        private async Task<(Order order, string error)> BuildNewOrder(
            Guid clientId,
            DateTime scheduledDate,
            string notes,
            IEnumerable<(Guid productId, int quantity)> items)
        {
            var itemsList = items?.ToList() ?? new List<(Guid productId, int quantity)>();
            if (itemsList.Count == 0)
            {
                return (null, "At least one item is required.");
            }

            var duplicateError = ValidateNoDuplicateItems(itemsList);
            if (duplicateError != null)
            {
                return (null, duplicateError);
            }

            var slotError = await ValidateSlot(scheduledDate);
            if (slotError != null)
            {
                return (null, slotError);
            }

            var products = await LoadProductsOrError(itemsList);
            if (products.error != null)
            {
                return (null, products.error);
            }

            var order = new Order
            {
                Id = Guid.NewGuid(),
                ClientId = clientId,
                ScheduledDate = scheduledDate,
                Status = OrderStatus.Pending,
                Notes = notes,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow,
                Active = true,
                // UnitPrice is snapshotted from the product's current price at the moment the
                // line is created, and is never recomputed from Product.Price afterwards - see
                // OrderItem.UnitPrice.
                OrderItems = itemsList.Select(i => new OrderItem
                {
                    ProductId = i.productId,
                    Quantity = i.quantity,
                    UnitPrice = products.byId[i.productId].Price
                }).ToList()
            };
            order.Number = $"ORD-{order.CreatedDate:yyyyMMddHHmmss}";
            return (order, null);
        }

        private static decimal OrderTotal(Order order)
            => order.OrderItems?.Sum(oi => oi.UnitPrice * oi.Quantity) ?? 0m;

        // Id is deliberately left unset so EF generates it on insert. When a Payment is attached
        // to an already-tracked order (PayOrder), EF treats a navigation entity whose Guid key is
        // already set as an existing row and would UPDATE instead of INSERT.
        private static Payment NewPayment(Order order, decimal amount, PaymentResult charge, CardDetails card) => new Payment
        {
            OrderId = order.Id,
            Amount = amount,
            Status = PaymentStatus.Paid,
            Method = "Card",
            CardBrand = charge.CardBrand,
            CardLast4 = charge.CardLast4,
            CardholderName = card.CardholderName?.Trim(),
            TransactionId = charge.TransactionId,
            PaidDate = DateTime.UtcNow
        };

        public async Task<(Order order, string error)> UpdateOrder(
            Order existing,
            DateTime scheduledDate,
            string notes,
            IEnumerable<(Guid productId, int quantity)> items)
        {
            if (existing.Status == OrderStatus.Rejected || existing.Status == OrderStatus.Cancelled)
            {
                return (null, "Cannot edit an order that has been rejected or cancelled.");
            }

            var itemsList = items?.ToList() ?? new List<(Guid productId, int quantity)>();
            if (itemsList.Count == 0)
            {
                return (null, "At least one item is required.");
            }

            var duplicateError = ValidateNoDuplicateItems(itemsList);
            if (duplicateError != null)
            {
                return (null, duplicateError);
            }

            if (existing.ScheduledDate != scheduledDate)
            {
                var slotError = await ValidateSlot(scheduledDate);
                if (slotError != null)
                {
                    return (null, slotError);
                }
                existing.ScheduledDate = scheduledDate;
            }

            var products = await LoadProductsOrError(itemsList);
            if (products.error != null)
            {
                return (null, products.error);
            }

            existing.Notes = notes;
            existing.OrderItems ??= new List<OrderItem>();

            var desiredProductIds = itemsList.Select(i => i.productId).ToHashSet();
            var toRemove = existing.OrderItems.Where(oi => !desiredProductIds.Contains(oi.ProductId)).ToList();
            foreach (var orderItem in toRemove)
            {
                existing.OrderItems.Remove(orderItem);
                _unitOfWork.Orders.RemoveOrderItem(orderItem);
            }

            foreach (var (productId, quantity) in itemsList)
            {
                var existingItem = existing.OrderItems.FirstOrDefault(oi => oi.ProductId == productId);
                if (existingItem != null)
                {
                    existingItem.Quantity = quantity;
                }
                else
                {
                    // A brand-new line (added during this edit) is snapshotted at today's price;
                    // pre-existing lines above only have their Quantity touched, so their
                    // UnitPrice snapshot from creation time is left alone.
                    existing.OrderItems.Add(new OrderItem
                    {
                        OrderId = existing.Id,
                        ProductId = productId,
                        Quantity = quantity,
                        UnitPrice = products.byId[productId].Price
                    });
                }
            }

            existing.UpdatedDate = DateTime.UtcNow;
            await _unitOfWork.CommitAsync();

            var updated = await _unitOfWork.Orders.GetByIdWithDetailsAsync(existing.Id);
            return (updated, null);
        }

        public async Task<(Order order, string error)> ApproveOrder(Order order, string adminNotes)
        {
            if (order.Status != OrderStatus.Pending)
            {
                return (null, "Only pending orders can be approved.");
            }

            order.Status = OrderStatus.Approved;
            order.AdminNotes = adminNotes;
            order.UpdatedDate = DateTime.UtcNow;
            await _unitOfWork.CommitAsync();
            return (order, null);
        }

        public async Task<(Order order, string error)> RejectOrder(Order order, string adminNotes)
        {
            if (order.Status != OrderStatus.Pending)
            {
                return (null, "Only pending orders can be rejected.");
            }

            order.Status = OrderStatus.Rejected;
            order.AdminNotes = adminNotes;
            order.UpdatedDate = DateTime.UtcNow;
            await RefundIfPaid(order);
            await _unitOfWork.CommitAsync();
            return (order, null);
        }

        public async Task CancelOrder(Order order)
        {
            order.Status = OrderStatus.Cancelled;
            order.UpdatedDate = DateTime.UtcNow;
            await RefundIfPaid(order);
            await _unitOfWork.CommitAsync();
        }

        // Rejected/cancelled orders are never fulfilled, so the checkout charge is returned in
        // full. If the gateway refuses the refund the payment stays Paid, which keeps it visible
        // to staff on the order rather than silently marking money as returned.
        private async Task RefundIfPaid(Order order)
        {
            var payment = order.Payment;
            if (payment == null || payment.Status != PaymentStatus.Paid) return;

            if (await _paymentService.RefundAsync(payment.TransactionId, payment.Amount))
            {
                payment.Status = PaymentStatus.Refunded;
                payment.RefundedDate = DateTime.UtcNow;
            }
        }

        private async Task<string> ValidateSlot(DateTime scheduledDate)
        {
            if (!SchedulingHelper.IsAlignedSlotStart(scheduledDate, _configuration))
            {
                return "The selected time is not a valid delivery slot.";
            }

            var minLeadTimeHours = SchedulingHelper.GetMinLeadTimeHours(_configuration);
            var maxAdvanceDays = SchedulingHelper.GetMaxAdvanceDays(_configuration);
            var slotCapacity = SchedulingHelper.GetSlotCapacity(_configuration);

            var now = DateTime.Now;
            if (scheduledDate < now.AddHours(minLeadTimeHours))
            {
                return $"Orders must be scheduled at least {minLeadTimeHours} hour(s) from now.";
            }

            if (scheduledDate > now.AddDays(maxAdvanceDays))
            {
                return $"Orders cannot be scheduled more than {maxAdvanceDays} day(s) in advance.";
            }

            var activeCount = await _unitOfWork.Orders.CountActiveInSlotAsync(scheduledDate);
            if (activeCount >= slotCapacity)
            {
                return "The selected delivery slot is fully booked.";
            }

            return null;
        }

        private async Task<(Dictionary<Guid, Product> byId, string error)> LoadProductsOrError(
            IEnumerable<(Guid productId, int quantity)> items)
        {
            var byId = new Dictionary<Guid, Product>();
            foreach (var (productId, _) in items)
            {
                var product = await _unitOfWork.Products.GetByIdAsync(productId);
                if (product == null)
                {
                    return (byId, $"Product {productId} was not found.");
                }

                byId[productId] = product;
            }

            return (byId, null);
        }

        // Guards against the same ProductId appearing more than once in a single order's items
        // array: OrderItem's composite key is (OrderId, ProductId), so inserting two brand-new
        // OrderItem instances for the same product in one Create would otherwise throw an
        // unhandled EF Core "already being tracked" InvalidOperationException (500) instead of
        // a clean validation error.
        private static string ValidateNoDuplicateItems(List<(Guid productId, int quantity)> items)
        {
            var duplicateProductId = items
                .GroupBy(i => i.productId)
                .FirstOrDefault(g => g.Count() > 1)
                ?.Key;

            return duplicateProductId.HasValue
                ? $"Product {duplicateProductId} appears more than once - combine quantities for the same product into a single line."
                : null;
        }
    }
}
