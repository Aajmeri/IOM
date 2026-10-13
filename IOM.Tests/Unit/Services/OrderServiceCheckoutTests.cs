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
    public class OrderServiceCheckoutTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IOrderRepository> _orders = new();
        private readonly Mock<IProductRepository> _products = new();
        private readonly Mock<IPaymentService> _payments = new();
        private readonly IConfiguration _configuration = new ConfigurationBuilder().Build();

        private readonly Product _widget = new() { Id = Guid.NewGuid(), Name = "Widget", Price = 10.00m };
        private readonly Product _gadget = new() { Id = Guid.NewGuid(), Name = "Gadget", Price = 2.50m };

        // A default-config slot (08:00-18:00, 2h slots) comfortably inside the 2h-lead/30-day window.
        private static readonly DateTime Slot = DateTime.Now.Date.AddDays(2).AddHours(10);

        private static readonly CardDetails Card = new()
        {
            CardholderName = "  Jane Client ",
            CardNumber = "4242424242424242",
            ExpiryMonth = 12,
            ExpiryYear = DateTime.UtcNow.Year + 2,
            Cvc = "123"
        };

        private Order _added;

        public OrderServiceCheckoutTests()
        {
            _unitOfWork.SetupGet(u => u.Orders).Returns(_orders.Object);
            _unitOfWork.SetupGet(u => u.Products).Returns(_products.Object);
            _products.Setup(p => p.GetByIdAsync(_widget.Id)).ReturnsAsync(_widget);
            _products.Setup(p => p.GetByIdAsync(_gadget.Id)).ReturnsAsync(_gadget);
            _orders.Setup(o => o.CountActiveInSlotAsync(It.IsAny<DateTime>())).ReturnsAsync(0);
            _orders.Setup(o => o.AddAsync(It.IsAny<Order>())).Callback<Order>(o => _added = o).Returns(Task.CompletedTask);
            _orders.Setup(o => o.GetByIdWithDetailsAsync(It.IsAny<Guid>())).ReturnsAsync(() => _added);
            _payments.Setup(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()))
                .ReturnsAsync(new PaymentResult { Succeeded = true, TransactionId = "SIM-1", CardBrand = "Visa", CardLast4 = "4242" });
            _payments.Setup(p => p.RefundAsync(It.IsAny<string>(), It.IsAny<decimal>())).ReturnsAsync(true);
        }

        private OrderService CreateService() => new(_unitOfWork.Object, _configuration, _payments.Object);

        private List<(Guid, int)> Items() => new() { (_widget.Id, 2), (_gadget.Id, 4) };

        [Fact]
        public async Task CreateOrder_ChargesServerComputedTotalAndSavesPayment()
        {
            var (order, error) = await CreateService().CreateOrder(Guid.NewGuid(), Slot, null, Items(), Card);

            Assert.Null(error);
            _payments.Verify(p => p.ChargeAsync(30.00m, Card, order.Number), Times.Once);
            Assert.NotNull(order.Payment);
            Assert.Equal(30.00m, order.Payment.Amount);
            Assert.Equal(PaymentStatus.Paid, order.Payment.Status);
            Assert.Equal("Visa", order.Payment.CardBrand);
            Assert.Equal("4242", order.Payment.CardLast4);
            Assert.Equal("SIM-1", order.Payment.TransactionId);
            Assert.Equal("Jane Client", order.Payment.CardholderName);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task CreateOrder_Declined_ReturnsErrorAndSavesNothing()
        {
            _payments.Setup(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()))
                .ReturnsAsync(new PaymentResult { Succeeded = false, DeclineReason = "Your card was declined." });

            var (order, error) = await CreateService().CreateOrder(Guid.NewGuid(), Slot, null, Items(), Card);

            Assert.Null(order);
            Assert.Equal("Payment failed: Your card was declined.", error);
            _orders.Verify(o => o.AddAsync(It.IsAny<Order>()), Times.Never);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Never);
        }

        [Fact]
        public async Task CreateOrder_InvalidSlot_NeverChargesTheCard()
        {
            var unalignedSlot = Slot.AddMinutes(30);

            var (order, error) = await CreateService().CreateOrder(Guid.NewGuid(), unalignedSlot, null, Items(), Card);

            Assert.Null(order);
            Assert.NotNull(error);
            _payments.Verify(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task CreateOrder_UnknownProduct_NeverChargesTheCard()
        {
            var items = new List<(Guid, int)> { (Guid.NewGuid(), 1) };

            var (order, error) = await CreateService().CreateOrder(Guid.NewGuid(), Slot, null, items, Card);

            Assert.Null(order);
            Assert.Contains("was not found", error);
            _payments.Verify(p => p.ChargeAsync(It.IsAny<decimal>(), It.IsAny<CardDetails>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task CreateOrder_NoCard_ReturnsError()
        {
            var (order, error) = await CreateService().CreateOrder(Guid.NewGuid(), Slot, null, Items(), null);

            Assert.Null(order);
            Assert.Equal("Payment details are required.", error);
        }

        [Fact]
        public async Task CreateOrder_SaveFailsAfterCharge_RefundsAndRethrows()
        {
            _unitOfWork.Setup(u => u.CommitAsync()).ThrowsAsync(new InvalidOperationException("db down"));

            await Assert.ThrowsAsync<InvalidOperationException>(() =>
                CreateService().CreateOrder(Guid.NewGuid(), Slot, null, Items(), Card));

            _payments.Verify(p => p.RefundAsync("SIM-1", 30.00m), Times.Once);
        }

        private static Order PaidPendingOrder() => new()
        {
            Id = Guid.NewGuid(),
            Status = OrderStatus.Pending,
            Payment = new Payment { Amount = 30m, Status = PaymentStatus.Paid, TransactionId = "SIM-9" }
        };

        [Fact]
        public async Task RejectOrder_RefundsPayment()
        {
            var order = PaidPendingOrder();

            var (rejected, error) = await CreateService().RejectOrder(order, "Out of stock");

            Assert.Null(error);
            _payments.Verify(p => p.RefundAsync("SIM-9", 30m), Times.Once);
            Assert.Equal(PaymentStatus.Refunded, rejected.Payment.Status);
            Assert.NotNull(rejected.Payment.RefundedDate);
        }

        [Fact]
        public async Task CancelOrder_RefundsPayment()
        {
            var order = PaidPendingOrder();

            await CreateService().CancelOrder(order);

            Assert.Equal(OrderStatus.Cancelled, order.Status);
            Assert.Equal(PaymentStatus.Refunded, order.Payment.Status);
        }

        [Fact]
        public async Task CancelOrder_RefundRefused_LeavesPaymentPaid()
        {
            _payments.Setup(p => p.RefundAsync(It.IsAny<string>(), It.IsAny<decimal>())).ReturnsAsync(false);
            var order = PaidPendingOrder();

            await CreateService().CancelOrder(order);

            Assert.Equal(PaymentStatus.Paid, order.Payment.Status);
            Assert.Null(order.Payment.RefundedDate);
        }

        [Fact]
        public async Task CancelOrder_AlreadyRefunded_DoesNotRefundTwice()
        {
            var order = PaidPendingOrder();
            order.Payment.Status = PaymentStatus.Refunded;

            await CreateService().CancelOrder(order);

            _payments.Verify(p => p.RefundAsync(It.IsAny<string>(), It.IsAny<decimal>()), Times.Never);
        }

        [Fact]
        public async Task ApproveOrder_DoesNotTouchPayment()
        {
            var order = PaidPendingOrder();

            await CreateService().ApproveOrder(order, null);

            Assert.Equal(PaymentStatus.Paid, order.Payment.Status);
            _payments.Verify(p => p.RefundAsync(It.IsAny<string>(), It.IsAny<decimal>()), Times.Never);
        }
    }
}
