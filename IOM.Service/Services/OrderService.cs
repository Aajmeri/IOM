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

        public OrderService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
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

            await _unitOfWork.Orders.AddAsync(order);
            await _unitOfWork.CommitAsync();

            var created = await _unitOfWork.Orders.GetByIdWithDetailsAsync(order.Id);
            return (created, null);
        }

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
            await _unitOfWork.CommitAsync();
            return (order, null);
        }

        public async Task CancelOrder(Order order)
        {
            order.Status = OrderStatus.Cancelled;
            order.UpdatedDate = DateTime.UtcNow;
            await _unitOfWork.CommitAsync();
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
