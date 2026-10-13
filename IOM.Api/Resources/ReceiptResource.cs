using System;
using System.Collections.Generic;

namespace IOM.Api.Resources
{
    public class ReceiptResource
    {
        public Guid OrderId { get; set; }
        public string OrderNumber { get; set; }
        public string OrderStatus { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public string Notes { get; set; }
        public List<OrderItemSummary> Items { get; set; } = new List<OrderItemSummary>();
        public decimal Total { get; set; }

        public string PaymentStatus { get; set; }
        public string PaymentMethod { get; set; }
        public string CardBrand { get; set; }
        public string CardLast4 { get; set; }
        public string CardholderName { get; set; }
        public string TransactionId { get; set; }
        public decimal AmountPaid { get; set; }
        public DateTime PaidDate { get; set; }
        public DateTime? RefundedDate { get; set; }

        // Set only on the checkout and resend-receipt responses: the address the receipt was
        // just emailed to, or null if that email couldn't be sent.
        public string EmailedTo { get; set; }
    }
}
