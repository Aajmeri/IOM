using System;

namespace IOM.Core.Models
{
    public class InvoiceSupplier
    {
        public Guid SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public Guid InvoiceId { get; set; }
        public Invoice Invoice { get; set; }
     
    }
}
