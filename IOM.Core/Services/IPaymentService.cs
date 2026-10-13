using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IPaymentService
    {
        /// <summary>Charges the card. A decline is returned as a result, not thrown.</summary>
        Task<PaymentResult> ChargeAsync(decimal amount, CardDetails card, string reference);

        /// <summary>Refunds a previous charge in full. Returns false if the refund was refused.</summary>
        Task<bool> RefundAsync(string transactionId, decimal amount);
    }
}
