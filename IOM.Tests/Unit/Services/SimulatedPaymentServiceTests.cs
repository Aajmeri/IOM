using System;
using System.Threading.Tasks;
using IOM.Core.Models;
using IOM.Service.Services;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class SimulatedPaymentServiceTests
    {
        private readonly SimulatedPaymentService _service = new(NullLogger<SimulatedPaymentService>.Instance);

        private static CardDetails Card(string number = "4242 4242 4242 4242", string cvc = "123") => new()
        {
            CardholderName = "Test Client",
            CardNumber = number,
            ExpiryMonth = 12,
            ExpiryYear = DateTime.UtcNow.Year + 2,
            Cvc = cvc
        };

        [Fact]
        public async Task ChargeAsync_ValidCard_SucceedsWithBrandLast4AndTransactionId()
        {
            var result = await _service.ChargeAsync(25.50m, Card(), "ORD-1");

            Assert.True(result.Succeeded);
            Assert.Equal("Visa", result.CardBrand);
            Assert.Equal("4242", result.CardLast4);
            Assert.StartsWith("SIM-", result.TransactionId);
            Assert.Null(result.DeclineReason);
        }

        [Fact]
        public async Task ChargeAsync_EachChargeGetsADistinctTransactionId()
        {
            var a = await _service.ChargeAsync(1m, Card(), "ORD-1");
            var b = await _service.ChargeAsync(1m, Card(), "ORD-2");

            Assert.NotEqual(a.TransactionId, b.TransactionId);
        }

        [Theory]
        [InlineData(SimulatedPaymentService.DeclinedCard, "declined")]
        [InlineData(SimulatedPaymentService.InsufficientFundsCard, "insufficient funds")]
        [InlineData("4242424242424241", "invalid")]
        public async Task ChargeAsync_TestDeclineAndInvalidCards_AreDeclined(string number, string reasonFragment)
        {
            var result = await _service.ChargeAsync(10m, Card(number), "ORD-1");

            Assert.False(result.Succeeded);
            Assert.Null(result.TransactionId);
            Assert.Contains(reasonFragment, result.DeclineReason);
        }

        [Fact]
        public async Task ChargeAsync_ExpiredCard_IsDeclined()
        {
            var card = Card();
            card.ExpiryYear = DateTime.UtcNow.Year - 1;

            var result = await _service.ChargeAsync(10m, card, "ORD-1");

            Assert.False(result.Succeeded);
            Assert.Contains("expired", result.DeclineReason);
        }

        [Fact]
        public async Task ChargeAsync_BadCvc_IsDeclined()
        {
            var result = await _service.ChargeAsync(10m, Card(cvc: "1"), "ORD-1");

            Assert.False(result.Succeeded);
        }

        [Fact]
        public async Task ChargeAsync_NonPositiveAmount_IsDeclined()
        {
            var result = await _service.ChargeAsync(0m, Card(), "ORD-1");

            Assert.False(result.Succeeded);
        }

        [Fact]
        public async Task RefundAsync_RequiresTransactionId()
        {
            Assert.True(await _service.RefundAsync("SIM-ABC", 10m));
            Assert.False(await _service.RefundAsync("", 10m));
        }
    }
}
