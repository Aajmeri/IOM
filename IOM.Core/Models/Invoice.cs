using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IOM.Core.Models
{
    public class Invoice : Base
    {
        [Key]
        public Guid Id { get; set; }
        public string Number { get; set; }
        public string Total { get; set; }
        public IList<InvoiceSupplier> InvoiceSupplier {get; set;}
        public IList<InvoiceItem> InvoiceItem {get; set;}
    }
}
