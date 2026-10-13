using System;
using System.Threading.Tasks;
using IOM.Core.Models;
using IOM.Core.Services;
using IOM.Service.Helpers;
using Microsoft.Extensions.Logging;

namespace IOM.Service.Services
{
    /// <summary>
    /// Stand-in payment gateway: no real payment provider or credentials exist for this repo
    /// (same situation as SmtpEmailService's dev mode). Any well-formed, unexpired card is
    /// approved and no money moves. Register a real IPaymentService implementation in Program.cs
    /// to take real payments; nothing else depends on this class.
    ///
    /// Test cards (Stripe's conventions):
    ///   4242 4242 4242 4242 - approved
    ///   4000 0000 0000 0002 - declined
    ///   4000 0000 0000 9995 - declined, insufficient funds
    /// </summary>
    public class SimulatedPaymentService : IPaymentService
    {
        public const string DeclinedCard = "4000000000000002";
        public const string InsufficientFundsCard = "4000000000009995";

        private readonly ILogger<SimulatedPaymentService> _logger;

        public SimulatedPaymentService(ILogger<SimulatedPaymentService> logger)
        {
            _logger = logger;
        }

        public Task<PaymentResult> ChargeAsync(decimal amount, CardDetails card, string reference)
        {
            if (amount <= 0)
                return Task.FromResult(Decline("The payment amount must be greater than zero."));
            if (card == null || !CardHelper.IsValidNumber(card.CardNumber))
                return Task.FromResult(Decline("The card number is invalid."));
            if (CardHelper.IsExpired(card.ExpiryMonth, card.ExpiryYear, DateTime.UtcNow))
                return Task.FromResult(Decline("The card has expired."));
            if (!CardHelper.IsValidCvc(card.Cvc))
                return Task.FromResult(Decline("The security code (CVC) is invalid."));

            var digits = CardHelper.Normalize(card.CardNumber);
            if (digits == DeclinedCard)
                return Task.FromResult(Decline("Your card was declined."));
            if (digits == InsufficientFundsCard)
                return Task.FromResult(Decline("Your card has insufficient funds."));

            var result = new PaymentResult
            {
                Succeeded = true,
                TransactionId = ("SIM-" + Guid.NewGuid().ToString("N")).Substring(0, 24).ToUpperInvariant(),
                CardBrand = CardHelper.GetBrand(digits),
                CardLast4 = CardHelper.GetLast4(digits)
            };

            _logger.LogInformation(
                "[SIMULATED PAYMENT - NO MONEY MOVED] Charged {Amount} to {Brand} ending {Last4} for {Reference} (txn {TransactionId})",
                amount, result.CardBrand, result.CardLast4, reference, result.TransactionId);

            return Task.FromResult(result);
        }

        public Task<bool> RefundAsync(string transactionId, decimal amount)
        {
            _logger.LogInformation(
                "[SIMULATED PAYMENT - NO MONEY MOVED] Refunded {Amount} for txn {TransactionId}",
                amount, transactionId);
            return Task.FromResult(!string.IsNullOrWhiteSpace(transactionId));
        }

        private static PaymentResult Decline(string reason) => new PaymentResult { Succeeded = false, DeclineReason = reason };
    }
}
