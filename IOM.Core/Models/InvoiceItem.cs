using System;

namespace IOM.Core.Models
{
    public class InvoiceItem
    {
        public Guid InvoiceId { get; set; }

        public Invoice Invoice { get; set; }

        public Guid ItemId { get; set; }

        public Item Item { get; set; }
    }
}
