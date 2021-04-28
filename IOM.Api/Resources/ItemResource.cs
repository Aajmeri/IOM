using System;
using System.Collections.Generic;
using IOM.Core.Models;

namespace IOM.Api.Resources
{
    public class ItemResource
    {
         public Guid Id { get; set; }
        public Product Product {get; set;}
        public Guid ProductId {get; set; }
        public IList<InvoiceItem> InvoiceItem { get; set; }
    }
}