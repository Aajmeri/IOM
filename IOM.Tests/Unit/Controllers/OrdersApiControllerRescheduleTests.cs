using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using IOM.Api.Controllers.Api;
using IOM.Api.Mapping;
using IOM.Api.Resources;
using IOM.Core.Models;
using IOM.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Controllers
{
    /// <summary>
    /// The reschedule email is composed in the controller (like the approve/reject status emails),
    /// so its content is verified here against a mocked IEmailService.
    /// </summary>
    public class OrdersApiControllerRescheduleTests
    {
        private readonly Mock<IOrderService> _orderService = new();
        private readonly Mock<IEmailService> _email = new();
        private readonly Mock<IReceiptService> _receipts = new();

        private static readonly DateTime OldSlot = new(2026, 11, 2, 10, 0, 0);
        private static readonly DateTime NewSlot = new(2026, 11, 4, 14, 0, 0);

        private readonly Order _order = new()
        {
            Id = Guid.NewGuid(),
            Number = "ORD-20261101090000",
            Status = OrderStatus.Pending,
            ScheduledDate = OldSlot,
            Client = new User { Name = "Jane Client", Email = "jane@example.com" },
            OrderItems = new List<OrderItem>()
        };

        private OrdersApiController CreateController()
        {
            _orderService.Setup(s => s.GetById(_order.Id)).ReturnsAsync(_order);
            var controller = new OrdersApiController(_orderService.Object, _email.Object, _receipts.Object, new OrderMapper(), NullLogger<OrdersApiController>.Instance);
            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.Role, "Warehouse")
                    }, "Test"))
                }
            };
            return controller;
        }

        private void ServiceReschedulesSuccessfully()
        {
            _orderService.Setup(s => s.RescheduleOrder(_order, NewSlot, It.IsAny<string>()))
                .ReturnsAsync((Order o, DateTime d, string reason) =>
                {
                    o.ScheduledDate = d;
                    if (!string.IsNullOrWhiteSpace(reason)) o.AdminNotes = reason.Trim();
                    return (o, (string)null);
                });
        }

        [Fact]
        public async Task Reschedule_Success_ReturnsOkWithNewDate()
        {
            ServiceReschedulesSuccessfully();

            var result = await CreateController().Reschedule(_order.Id, new RescheduleOrderResource { ScheduledDate = NewSlot });

            var ok = Assert.IsType<OkObjectResult>(result);
            var resource = Assert.IsType<OrderResource>(ok.Value);
            Assert.Equal(NewSlot, resource.ScheduledDate);
        }

        [Fact]
        public async Task Reschedule_Success_EmailsClientWithOldAndNewSlotAndReason()
        {
            ServiceReschedulesSuccessfully();

            await CreateController().Reschedule(_order.Id, new RescheduleOrderResource
            {
                ScheduledDate = NewSlot,
                Reason = "Delivery truck unavailable"
            });

            _email.Verify(e => e.SendAsync(
                "jane@example.com",
                "Your order ORD-20261101090000 has been rescheduled",
                It.Is<string>(body =>
                    body.Contains("2026-11-02 10:00") &&
                    body.Contains("2026-11-04 14:00") &&
                    body.Contains("Delivery truck unavailable"))), Times.Once);
        }

        [Fact]
        public async Task Reschedule_ServiceError_Returns400AndSendsNoEmail()
        {
            _orderService.Setup(s => s.RescheduleOrder(_order, NewSlot, It.IsAny<string>()))
                .ReturnsAsync(((Order)null, "The selected delivery slot is fully booked."));

            var result = await CreateController().Reschedule(_order.Id, new RescheduleOrderResource { ScheduledDate = NewSlot });

            Assert.IsType<BadRequestObjectResult>(result);
            _email.Verify(e => e.SendAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task Reschedule_UnknownOrder_Returns404()
        {
            var result = await CreateController().Reschedule(Guid.NewGuid(), new RescheduleOrderResource { ScheduledDate = NewSlot });

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Reschedule_EmailFailure_StillReturnsOk()
        {
            // The new date is already saved; a mail outage must not make the reschedule look failed.
            ServiceReschedulesSuccessfully();
            _email.Setup(e => e.SendAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .ThrowsAsync(new InvalidOperationException("SMTP down"));

            var result = await CreateController().Reschedule(_order.Id, new RescheduleOrderResource { ScheduledDate = NewSlot });

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
