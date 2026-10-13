using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Repositories;
using IOM.Core.Services;
using IOM.Service.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class OrderServicePayLaterAndRescheduleTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IOrderRepository> _orders = new();
        private readonly Mock<IProductRepository> _products = new();
        private readonly Mock<IPaymentService> _payments = new();
        private readonly IConfiguration _configuration = new ConfigurationBuilder().Build();

        private readonly Product _widget = new() { Id = Guid.NewGuid(), Name = "Widget", Price = 10.00m };

        // Default config: 08:00-18:00 in 2h slots, 2h minimum lead time, 30 days max advance.
        private static readonly DateTime Slot = DateTime.Now.Date.AddDays(2).AddHours(10);
        private static readonly DateTime OtherSlot = DateTime.Now.Date.AddDays(3).AddHours(14);

        private static readonly CardDetails Card = new()
        {
            CardholderName = "Jane Client",
            CardNumber = "4242424242424242",
            ExpiryMonth = 12,
            ExpiryYear = DateTime.UtcNow.Year + 2,
            Cvc = "123"
        };

        private Order _added;

        public OrderServicePayLaterAndRescheduleTests()
        {
            _unitOfWork.SetupGet(u => u.Orders).Returns(_orders.Object);
            _unitOfWork.SetupGet(u => u.Products).Returns(_products.Object);
            _products.Setup(p => p.GetByIdAsync(_widget.Id)).ReturnsAsync(_widget);
            _orders.Setup(o => o.CountActiveInSlotAsync(It.IsAny<DateTime>())).ReturnsAsync(0);
            _orders.Setup(o => o.AddAsync(It.IsAny<Order>())).Callback<Order>(o => _added = o).Returns(Task.CompletedTask);
            _orders.Setup(o => o.GetByIdWithDetailsAsync(It.IsAny<Guid>())).ReturnsAsync(() => _added);
            _payments.Setup(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()))
                .ReturnsAsync(new PaymentResult { Succeeded = true, TransactionId = "SIM-1", CardBrand = "Visa", CardLast4 = "4242" });
        }

        private OrderService CreateService() => new(_unitOfWork.Object, _configuration, _payments.Object);

        private List<(Guid, int)> Items() => new() { (_widget.Id, 3) };

        private Order UnpaidOrder(OrderStatus status = OrderStatus.Pending) => new()
        {
            Id = Guid.NewGuid(),
            Number = "ORD-1",
            Status = status,
            ScheduledDate = Slot,
            OrderItems = new List<OrderItem> { new() { ProductId = _widget.Id, Quantity = 3, UnitPrice = 10.00m } }
        };

        // ---- Pay later -------------------------------------------------------------------

        [Fact]
        public async Task CreateOrderPayLater_SavesPendingOrderWithoutPaymentAndNeverCharges()
        {
            var (order, error) = await CreateService().CreateOrderPayLater(Guid.NewGuid(), Slot, "notes", Items());

            Assert.Null(error);
            Assert.NotNull(order);
            Assert.Equal(OrderStatus.Pending, order.Status);
            Assert.Null(order.Payment);
            Assert.Equal(10.00m, Assert.Single(order.OrderItems).UnitPrice);
            _payments.Verify(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()), Times.Never);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task CreateOrderPayLater_StillValidatesTheSlot()
        {
            var (order, error) = await CreateService().CreateOrderPayLater(Guid.NewGuid(), Slot.AddMinutes(30), null, Items());

            Assert.Null(order);
            Assert.NotNull(error);
            _orders.Verify(o => o.AddAsync(It.IsAny<Order>()), Times.Never);
        }

        [Fact]
        public async Task CreateOrderPayLater_StillRequiresItems()
        {
            var (order, error) = await CreateService().CreateOrderPayLater(Guid.NewGuid(), Slot, null, new List<(Guid, int)>());

            Assert.Null(order);
            Assert.Equal("At least one item is required.", error);
        }

        [Fact]
        public async Task PayOrder_UnpaidOrder_ChargesSnapshottedTotalAndAttachesPayment()
        {
            var order = UnpaidOrder();
            _orders.Setup(o => o.GetByIdWithDetailsAsync(order.Id)).ReturnsAsync(order);

            var (paid, error) = await CreateService().PayOrder(order, Card);

            Assert.Null(error);
            _payments.Verify(p => p.ChargeAsync(30.00m, Card, "ORD-1"), Times.Once);
            Assert.NotNull(paid.Payment);
            Assert.Equal(PaymentStatus.Paid, paid.Payment.Status);
            Assert.Equal(30.00m, paid.Payment.Amount);
            Assert.Equal("SIM-1", paid.Payment.TransactionId);
            Assert.Equal(order.Id, paid.Payment.OrderId);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task PayOrder_ApprovedUnpaidOrder_CanBePaid()
        {
            var order = UnpaidOrder(OrderStatus.Approved);
            _orders.Setup(o => o.GetByIdWithDetailsAsync(order.Id)).ReturnsAsync(order);

            var (paid, error) = await CreateService().PayOrder(order, Card);

            Assert.Null(error);
            Assert.NotNull(paid.Payment);
        }

        [Fact]
        public async Task PayOrder_AlreadyPaid_ReturnsErrorAndDoesNotCharge()
        {
            var order = UnpaidOrder();
            order.Payment = new Payment { Status = PaymentStatus.Paid, Amount = 30m, TransactionId = "SIM-0" };

            var (paid, error) = await CreateService().PayOrder(order, Card);

            Assert.Null(paid);
            Assert.Equal("This order has already been paid.", error);
            _payments.Verify(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()), Times.Never);
        }

        [Theory]
        [InlineData(OrderStatus.Rejected)]
        [InlineData(OrderStatus.Cancelled)]
        public async Task PayOrder_RejectedOrCancelled_ReturnsErrorAndDoesNotCharge(OrderStatus status)
        {
            var (paid, error) = await CreateService().PayOrder(UnpaidOrder(status), Card);

            Assert.Null(paid);
            Assert.Equal("Only pending or approved orders can be paid.", error);
            _payments.Verify(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task PayOrder_Declined_ReturnsErrorAndSavesNothing()
        {
            _payments.Setup(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()))
                .ReturnsAsync(new PaymentResult { Succeeded = false, DeclineReason = "Your card was declined." });
            var order = UnpaidOrder();

            var (paid, error) = await CreateService().PayOrder(order, Card);

            Assert.Null(paid);
            Assert.Equal("Payment failed: Your card was declined.", error);
            Assert.Null(order.Payment);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Never);
        }

        [Fact]
        public async Task PayOrder_NoCard_ReturnsError()
        {
            var (paid, error) = await CreateService().PayOrder(UnpaidOrder(), null);

            Assert.Null(paid);
            Assert.Equal("Payment details are required.", error);
        }

        // ---- Reschedule ------------------------------------------------------------------

        [Theory]
        [InlineData(OrderStatus.Pending)]
        [InlineData(OrderStatus.Approved)]
        public async Task RescheduleOrder_MovesToNewSlotAndKeepsStatus(OrderStatus status)
        {
            var order = UnpaidOrder(status);

            var (rescheduled, error) = await CreateService().RescheduleOrder(order, OtherSlot, null);

            Assert.Null(error);
            Assert.Equal(OtherSlot, rescheduled.ScheduledDate);
            Assert.Equal(status, rescheduled.Status);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task RescheduleOrder_ReasonIsStoredAsAdminNotes()
        {
            var order = UnpaidOrder();
            order.AdminNotes = "earlier note";

            var (rescheduled, _) = await CreateService().RescheduleOrder(order, OtherSlot, "  Truck unavailable  ");

            Assert.Equal("Truck unavailable", rescheduled.AdminNotes);
        }

        [Fact]
        public async Task RescheduleOrder_BlankReason_KeepsExistingAdminNotes()
        {
            var order = UnpaidOrder();
            order.AdminNotes = "earlier note";

            var (rescheduled, _) = await CreateService().RescheduleOrder(order, OtherSlot, "   ");

            Assert.Equal("earlier note", rescheduled.AdminNotes);
        }

        [Theory]
        [InlineData(OrderStatus.Rejected)]
        [InlineData(OrderStatus.Cancelled)]
        public async Task RescheduleOrder_RejectedOrCancelled_ReturnsError(OrderStatus status)
        {
            var order = UnpaidOrder(status);

            var (rescheduled, error) = await CreateService().RescheduleOrder(order, OtherSlot, null);

            Assert.Null(rescheduled);
            Assert.Equal("Only pending or approved orders can be rescheduled.", error);
            Assert.Equal(Slot, order.ScheduledDate);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Never);
        }

        [Fact]
        public async Task RescheduleOrder_SameSlot_ReturnsError()
        {
            var (rescheduled, error) = await CreateService().RescheduleOrder(UnpaidOrder(), Slot, null);

            Assert.Null(rescheduled);
            Assert.Equal("The order is already scheduled for that time.", error);
        }

        [Fact]
        public async Task RescheduleOrder_UnalignedSlot_ReturnsErrorAndLeavesDateUnchanged()
        {
            var order = UnpaidOrder();

            var (rescheduled, error) = await CreateService().RescheduleOrder(order, OtherSlot.AddMinutes(30), null);

            Assert.Null(rescheduled);
            Assert.Equal("The selected time is not a valid delivery slot.", error);
            Assert.Equal(Slot, order.ScheduledDate);
        }

        [Fact]
        public async Task RescheduleOrder_FullSlot_ReturnsError()
        {
            _orders.Setup(o => o.CountActiveInSlotAsync(OtherSlot)).ReturnsAsync(3);

            var (rescheduled, error) = await CreateService().RescheduleOrder(UnpaidOrder(), OtherSlot, null);

            Assert.Null(rescheduled);
            Assert.Equal("The selected delivery slot is fully booked.", error);
        }

        [Fact]
        public async Task RescheduleOrder_PastSlot_ReturnsError()
        {
            var past = DateTime.Now.Date.AddDays(-1).AddHours(10);

            var (rescheduled, error) = await CreateService().RescheduleOrder(UnpaidOrder(), past, null);

            Assert.Null(rescheduled);
            Assert.Contains("at least", error);
        }
    }
}
