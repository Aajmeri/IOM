using System;
using System.Collections.Generic;

namespace IOM.Api.Resources
{
    public class InvoiceResource
    {
        public Guid Id { get; set; }
        public string Number { get; set; }
        public string Total { get; set; }
        public Guid? SupplierId { get; set; }
        public string SupplierName { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<InvoiceItemSummary> Items { get; set; } = new List<InvoiceItemSummary>();
    }

    public class InvoiceItemSummary
    {
        public Guid ItemId { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public DateTime? ExpirationDate { get; set; }
    }
}
