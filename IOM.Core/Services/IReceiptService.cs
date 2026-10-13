using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IReceiptService
    {
        /// <summary>Builds the plain-text receipt body for a paid order.</summary>
        string BuildReceiptText(Order order);

        /// <summary>
        /// Emails the receipt to the order's client. Returns false (and does not throw) when the
        /// order has no payment or client email, or the email could not be sent.
        /// </summary>
        Task<bool> SendReceiptAsync(Order order);
    }
}
