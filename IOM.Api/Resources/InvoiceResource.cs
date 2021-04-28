using System;
using System.Collections.Generic;
using IOM.Core.Models;

namespace IOM.Api.Resources
{
    public class InvoiceResource
    {
        public Guid Id { get; set; }
        public string Number { get; set; }
        public string Total { get; set; }
        public IList<InvoiceSupplier> InvoiceSupplier {get; set;}
        public IList<InvoiceItem> InvoiceItem {get; set;}
        
    }
}