using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IOM.Api.Mapping;
using IOM.Api.Resources;
using IOM.Core.Models;
using IOM.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IOM.Api.Controllers.Api
{
    [ApiController]
    [Route("api/orders")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class OrdersApiController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IEmailService _emailService;
        private readonly IReceiptService _receiptService;
        private readonly OrderMapper _mapper;
        private readonly ILogger<OrdersApiController> _logger;

        public OrdersApiController(IOrderService orderService, IEmailService emailService, IReceiptService receiptService, OrderMapper mapper, ILogger<OrdersApiController> logger)
        {
            _orderService = orderService;
            _emailService = emailService;
            _receiptService = receiptService;
            _mapper = mapper;
            _logger = logger;
        }

        // Guid.Parse would throw (-> unhandled 500) if the NameIdentifier claim were ever
        // missing/malformed instead of failing cleanly, so this is TryParse-based and callers
        // branch on null via TryGetCurrentUserId.
        private Guid? CurrentUserId
        {
            get
            {
                var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                return Guid.TryParse(claim, out var id) ? id : null;
            }
        }

        private bool TryGetCurrentUserId(out Guid userId)
        {
            var currentUserId = CurrentUserId;
            userId = currentUserId ?? Guid.Empty;
            return currentUserId.HasValue;
        }

        // Checkout. Pay now: the order is only created together with a successful card payment,
        // and the response is the receipt (also emailed to the client). Pay later (PayLater=true):
        // the order is created unpaid and the response is the OrderResource; it can be paid
        // afterwards via POST {id}/pay.
        [HttpPost]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> Create([FromBody] CheckoutResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!TryGetCurrentUserId(out var userId)) return Unauthorized();

            var items = _mapper.ToOrderItems(model.Items);

            if (model.PayLater)
            {
                var (unpaid, payLaterError) = await _orderService.CreateOrderPayLater(userId, model.ScheduledDate, model.Notes, items);
                if (payLaterError != null) return BadRequest(new { message = payLaterError });

                return CreatedAtAction(nameof(GetById), new { id = unpaid.Id }, _mapper.ToResource(unpaid));
            }

            var card = _mapper.ToCardDetails(model.Payment);
            var (order, error) = await _orderService.CreateOrder(userId, model.ScheduledDate, model.Notes, items, card);
            if (error != null) return BadRequest(new { message = error });

            var receipt = _mapper.ToReceipt(order);
            if (await _receiptService.SendReceiptAsync(order)) receipt.EmailedTo = order.Client.Email;

            return CreatedAtAction(nameof(GetReceipt), new { id = order.Id }, receipt);
        }

        [HttpGet("{id}/receipt")]
        public async Task<IActionResult> GetReceipt(Guid id)
        {
            var (order, denied) = await GetOrderForCurrentUser(id);
            if (denied != null) return denied;
            if (order.Payment == null) return NotFound(new { message = "This order has no payment on record, so there is no receipt." });

            return Ok(_mapper.ToReceipt(order));
        }

        [HttpPost("{id}/receipt/email")]
        public async Task<IActionResult> EmailReceipt(Guid id)
        {
            var (order, denied) = await GetOrderForCurrentUser(id);
            if (denied != null) return denied;
            if (order.Payment == null) return NotFound(new { message = "This order has no payment on record, so there is no receipt." });

            if (!await _receiptService.SendReceiptAsync(order))
                return StatusCode(StatusCodes.Status502BadGateway, new { message = "The receipt email could not be sent. Please try again later." });

            var receipt = _mapper.ToReceipt(order);
            receipt.EmailedTo = order.Client.Email;
            return Ok(receipt);
        }

        [HttpGet("mine")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetMine()
        {
            if (!TryGetCurrentUserId(out var userId)) return Unauthorized();

            var orders = await _orderService.GetByClientId(userId);
            return Ok(_mapper.ToResource(orders));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> Cancel(Guid id)
        {
            if (!TryGetCurrentUserId(out var userId)) return Unauthorized();

            var order = await _orderService.GetById(id);
            if (order == null) return NotFound();
            if (order.ClientId != userId) return Forbid();
            if (order.Status != OrderStatus.Pending)
                return BadRequest(new { message = "Only pending orders can be cancelled." });

            await _orderService.CancelOrder(order);
            return NoContent();
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetAll([FromQuery] string status)
        {
            var orders = await _orderService.GetAll();

            if (!string.IsNullOrWhiteSpace(status))
            {
                if (!Enum.TryParse<OrderStatus>(status, true, out var parsedStatus))
                    return BadRequest(new { message = $"Status must be one of: {string.Join(", ", Enum.GetNames(typeof(OrderStatus)))}" });

                orders = orders.Where(o => o.Status == parsedStatus);
            }

            return Ok(_mapper.ToResource(orders));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var (order, denied) = await GetOrderForCurrentUser(id);
            if (denied != null) return denied;

            return Ok(_mapper.ToResource(order));
        }

        // Staff can see any order; a client only their own.
        private async Task<(Order order, IActionResult denied)> GetOrderForCurrentUser(Guid id)
        {
            var order = await _orderService.GetById(id);
            if (order == null) return (null, NotFound());

            if (!User.IsInRole("Admin") && !User.IsInRole("Warehouse"))
            {
                if (!TryGetCurrentUserId(out var userId)) return (null, Unauthorized());
                if (order.ClientId != userId) return (null, Forbid());
            }

            return (order, null);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SaveOrderResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var order = await _orderService.GetById(id);
            if (order == null) return NotFound();

            var items = _mapper.ToOrderItems(model.Items);
            var (updated, error) = await _orderService.UpdateOrder(order, model.ScheduledDate, model.Notes, items);
            if (error != null) return BadRequest(new { message = error });

            return Ok(_mapper.ToResource(updated));
        }

        // Pays for a pay-later order. Only the client who owns the order can pay it.
        [HttpPost("{id}/pay")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> Pay(Guid id, [FromBody] PaymentCardResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var (order, denied) = await GetOrderForCurrentUser(id);
            if (denied != null) return denied;

            var (paid, error) = await _orderService.PayOrder(order, _mapper.ToCardDetails(model));
            if (error != null) return BadRequest(new { message = error });

            var receipt = _mapper.ToReceipt(paid);
            if (await _receiptService.SendReceiptAsync(paid)) receipt.EmailedTo = paid.Client.Email;

            return Ok(receipt);
        }

        [HttpPost("{id}/reschedule")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Reschedule(Guid id, [FromBody] RescheduleOrderResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var order = await _orderService.GetById(id);
            if (order == null) return NotFound();

            var previousDate = order.ScheduledDate;
            var (rescheduled, error) = await _orderService.RescheduleOrder(order, model.ScheduledDate, model.Reason);
            if (error != null) return BadRequest(new { message = error });

            await SendRescheduledEmail(rescheduled, previousDate, model.Reason);

            return Ok(_mapper.ToResource(rescheduled));
        }

        [HttpPost("{id}/approve")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Approve(Guid id, [FromBody] AdminNotesRequest model)
        {
            var order = await _orderService.GetById(id);
            if (order == null) return NotFound();

            var (approved, error) = await _orderService.ApproveOrder(order, model?.AdminNotes);
            if (error != null) return BadRequest(new { message = error });

            await SendStatusEmail(approved, "approved");

            return Ok(_mapper.ToResource(approved));
        }

        [HttpPost("{id}/reject")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Reject(Guid id, [FromBody] AdminNotesRequest model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.AdminNotes))
                return BadRequest(new { message = "A reason (adminNotes) is required to reject an order." });

            var order = await _orderService.GetById(id);
            if (order == null) return NotFound();

            var (rejected, error) = await _orderService.RejectOrder(order, model.AdminNotes);
            if (error != null) return BadRequest(new { message = error });

            await SendStatusEmail(rejected, "rejected");

            return Ok(_mapper.ToResource(rejected));
        }

        private async Task SendRescheduledEmail(Order order, DateTime previousDate, string reason)
        {
            if (order?.Client?.Email == null) return;

            var body =
                $"Hello {order.Client.Name},\n\n" +
                $"Your order {order.Number} has been rescheduled.\n\n" +
                $"Previous delivery slot: {previousDate:yyyy-MM-dd HH:mm}\n" +
                $"New delivery slot:      {order.ScheduledDate:yyyy-MM-dd HH:mm}\n" +
                (string.IsNullOrWhiteSpace(reason) ? string.Empty : $"Reason: {reason.Trim()}\n") +
                "\nIf the new time doesn't work for you, please contact us.\n";

            try
            {
                await _emailService.SendAsync(order.Client.Email, $"Your order {order.Number} has been rescheduled", body);
            }
            catch (Exception ex)
            {
                // The new date is already saved, so a mail outage must not turn the reschedule
                // into an error response (staff would retry and hit "already scheduled").
                _logger.LogError(ex, "Failed to email reschedule notice for order {OrderNumber}", order.Number);
            }
        }

        private async Task SendStatusEmail(Order order, string status)
        {
            if (order?.Client?.Email == null) return;

            // Use each line's snapshotted UnitPrice (the price at the time the line was added),
            // not the product's current price - see OrderItem.UnitPrice.
            var total = order.OrderItems?.Sum(oi => oi.UnitPrice * oi.Quantity) ?? 0m;
            var lines = order.OrderItems?
                .Select(oi => $"  - {oi.Product?.Name} x {oi.Quantity}")
                ?? Enumerable.Empty<string>();

            var body =
                $"Order Number: {order.Number}\n" +
                $"Scheduled Date: {order.ScheduledDate:yyyy-MM-dd HH:mm}\n" +
                $"Items:\n{string.Join("\n", lines)}\n" +
                $"Total: {total:C}\n" +
                (string.IsNullOrWhiteSpace(order.AdminNotes) ? string.Empty : $"Notes from admin: {order.AdminNotes}\n") +
                (order.Payment?.Status == PaymentStatus.Refunded
                    ? $"A refund of {order.Payment.Amount:C} has been issued to your {order.Payment.CardBrand} ending in {order.Payment.CardLast4}.\n"
                    : string.Empty);

            await _emailService.SendAsync(order.Client.Email, $"Your order {order.Number} has been {status}", body);
        }
    }

    public class AdminNotesRequest
    {
        public string AdminNotes { get; set; }
    }
}
