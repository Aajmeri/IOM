using System;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IOM.Core.Models;
using IOM.Core.Services;
using Microsoft.Extensions.Logging;

namespace IOM.Service.Services
{
    public class ReceiptService : IReceiptService
    {
        private static readonly CultureInfo Currency = CultureInfo.GetCultureInfo("en-US");

        private readonly IEmailService _emailService;
        private readonly ILogger<ReceiptService> _logger;

        public ReceiptService(IEmailService emailService, ILogger<ReceiptService> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }

        public string BuildReceiptText(Order order)
        {
            var payment = order.Payment;
            var rule = new string('-', 48);
            var sb = new StringBuilder();

            sb.AppendLine($"Thank you for your order, {order.Client?.Name}.");
            sb.AppendLine();
            sb.AppendLine("RECEIPT");
            sb.AppendLine(new string('=', 48));
            sb.AppendLine($"Order Number:   {order.Number}");
            sb.AppendLine($"Order Date:     {order.CreatedDate:yyyy-MM-dd HH:mm} UTC");
            sb.AppendLine($"Delivery Slot:  {order.ScheduledDate:yyyy-MM-dd HH:mm}");
            sb.AppendLine(rule);

            // Line prices come from each OrderItem's UnitPrice snapshot, never the product's
            // current price - see OrderItem.UnitPrice.
            foreach (var oi in order.OrderItems ?? Enumerable.Empty<OrderItem>())
            {
                sb.AppendLine(oi.Product?.Name);
                sb.AppendLine($"    {oi.Quantity} x {Money(oi.UnitPrice)}".PadRight(36) + Money(oi.UnitPrice * oi.Quantity).PadLeft(12));
            }

            var total = order.OrderItems?.Sum(oi => oi.UnitPrice * oi.Quantity) ?? 0m;
            sb.AppendLine(rule);
            sb.AppendLine("TOTAL".PadRight(36) + Money(total).PadLeft(12));
            sb.AppendLine();

            if (payment != null)
            {
                sb.AppendLine($"Paid with:      {payment.CardBrand} ending in {payment.CardLast4}");
                sb.AppendLine($"Amount Charged: {Money(payment.Amount)}");
                sb.AppendLine($"Transaction ID: {payment.TransactionId}");
                sb.AppendLine($"Payment Date:   {payment.PaidDate:yyyy-MM-dd HH:mm} UTC");
                if (payment.Status == PaymentStatus.Refunded)
                {
                    sb.AppendLine($"REFUNDED:       {payment.RefundedDate:yyyy-MM-dd HH:mm} UTC");
                }
                sb.AppendLine();
            }

            sb.AppendLine($"Order status: {order.Status}. You will receive another email once your order has been reviewed.");
            return sb.ToString();
        }

        public async Task<bool> SendReceiptAsync(Order order)
        {
            if (order?.Payment == null || string.IsNullOrWhiteSpace(order.Client?.Email)) return false;

            try
            {
                await _emailService.SendAsync(order.Client.Email, $"Your receipt for order {order.Number}", BuildReceiptText(order));
                return true;
            }
            catch (Exception ex)
            {
                // By the time a receipt is sent the card has been charged and the order saved, so
                // a mail failure must not surface as a failed checkout. Log it; the client can
                // resend from the receipt page.
                _logger.LogError(ex, "Failed to email receipt for order {OrderNumber}", order.Number);
                return false;
            }
        }

        private static string Money(decimal amount) => amount.ToString("C", Currency);
    }
}
