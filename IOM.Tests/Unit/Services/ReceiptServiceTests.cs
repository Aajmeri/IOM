using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;
using IOM.Core.Services;
using IOM.Service.Services;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class ReceiptServiceTests
    {
        private readonly Mock<IEmailService> _email = new();

        private ReceiptService CreateService() => new(_email.Object, NullLogger<ReceiptService>.Instance);

        private static Order PaidOrder() => new()
        {
            Id = Guid.NewGuid(),
            Number = "ORD-20261012100000",
            CreatedDate = new DateTime(2026, 10, 12, 10, 0, 0),
            ScheduledDate = new DateTime(2026, 10, 15, 8, 0, 0),
            Status = OrderStatus.Pending,
            Client = new User { Name = "Jane Client", Email = "jane@example.com" },
            OrderItems = new List<OrderItem>
            {
                new() { Product = new Product { Name = "Widget" }, Quantity = 2, UnitPrice = 10.00m },
                new() { Product = new Product { Name = "Gadget" }, Quantity = 1, UnitPrice = 5.25m }
            },
            Payment = new Payment
            {
                Amount = 25.25m,
                Status = PaymentStatus.Paid,
                CardBrand = "Visa",
                CardLast4 = "4242",
                TransactionId = "SIM-TXN123",
                PaidDate = new DateTime(2026, 10, 12, 10, 0, 0)
            }
        };

        [Fact]
        public void BuildReceiptText_IncludesOrderLinesTotalAndPayment()
        {
            var text = CreateService().BuildReceiptText(PaidOrder());

            Assert.Contains("ORD-20261012100000", text);
            Assert.Contains("Jane Client", text);
            Assert.Contains("Widget", text);
            Assert.Contains("2 x $10.00", text);
            Assert.Contains("$20.00", text);
            Assert.Contains("Gadget", text);
            Assert.Contains("$25.25", text);
            Assert.Contains("Visa ending in 4242", text);
            Assert.Contains("SIM-TXN123", text);
            Assert.DoesNotContain("REFUNDED", text);
        }

        [Fact]
        public void BuildReceiptText_RefundedPayment_IsMarkedRefunded()
        {
            var order = PaidOrder();
            order.Payment.Status = PaymentStatus.Refunded;
            order.Payment.RefundedDate = new DateTime(2026, 10, 13);

            var text = CreateService().BuildReceiptText(order);

            Assert.Contains("REFUNDED", text);
        }

        [Fact]
        public async Task SendReceiptAsync_EmailsTheClient()
        {
            var sent = await CreateService().SendReceiptAsync(PaidOrder());

            Assert.True(sent);
            _email.Verify(e => e.SendAsync(
                "jane@example.com",
                It.Is<string>(s => s.Contains("ORD-20261012100000")),
                It.Is<string>(b => b.Contains("Visa ending in 4242"))), Times.Once);
        }

        [Fact]
        public async Task SendReceiptAsync_NoPayment_DoesNotSend()
        {
            var order = PaidOrder();
            order.Payment = null;

            var sent = await CreateService().SendReceiptAsync(order);

            Assert.False(sent);
            _email.Verify(e => e.SendAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task SendReceiptAsync_EmailFailure_ReturnsFalseInsteadOfThrowing()
        {
            _email.Setup(e => e.SendAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .ThrowsAsync(new InvalidOperationException("SMTP down"));

            var sent = await CreateService().SendReceiptAsync(PaidOrder());

            Assert.False(sent);
        }
    }
}
