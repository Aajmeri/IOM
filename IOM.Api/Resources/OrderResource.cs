using System;
using System.Collections.Generic;

namespace IOM.Api.Resources
{
    public class OrderResource
    {
        public Guid Id { get; set; }
        public string Number { get; set; }
        public Guid ClientId { get; set; }
        public string ClientName { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
        public string AdminNotes { get; set; }
        public decimal Total { get; set; }
        public DateTime CreatedDate { get; set; }
        // "Paid", "Refunded", or "Unpaid" (pay-later orders, and orders placed before checkout took payment).
        public string PaymentStatus { get; set; }
        public List<OrderItemSummary> Items { get; set; } = new List<OrderItemSummary>();
    }

    public class OrderItemSummary
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
