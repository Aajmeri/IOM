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
using Microsoft.AspNetCore.Mvc;

namespace IOM.Api.Controllers.Api
{
    [ApiController]
    [Route("api/orders")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class OrdersApiController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IEmailService _emailService;
        private readonly OrderMapper _mapper;

        public OrdersApiController(IOrderService orderService, IEmailService emailService, OrderMapper mapper)
        {
            _orderService = orderService;
            _emailService = emailService;
            _mapper = mapper;
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

        [HttpPost]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> Create([FromBody] SaveOrderResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!TryGetCurrentUserId(out var userId)) return Unauthorized();

            var items = _mapper.ToOrderItems(model.Items);
            var (order, error) = await _orderService.CreateOrder(userId, model.ScheduledDate, model.Notes, items);
            if (error != null) return BadRequest(new { message = error });

            return CreatedAtAction(nameof(GetById), new { id = order.Id }, _mapper.ToResource(order));
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
            var order = await _orderService.GetById(id);
            if (order == null) return NotFound();

            if (!User.IsInRole("Admin") && !User.IsInRole("Warehouse"))
            {
                if (!TryGetCurrentUserId(out var userId)) return Unauthorized();
                if (order.ClientId != userId) return Forbid();
            }

            return Ok(_mapper.ToResource(order));
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
                (string.IsNullOrWhiteSpace(order.AdminNotes) ? string.Empty : $"Notes from admin: {order.AdminNotes}\n");

            await _emailService.SendAsync(order.Client.Email, $"Your order {order.Number} has been {status}", body);
        }
    }

    public class AdminNotesRequest
    {
        public string AdminNotes { get; set; }
    }
}
