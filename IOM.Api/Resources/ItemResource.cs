using System;
using System.Collections.Generic;
using IOM.Core.Models;

namespace IOM.Api.Resources
{
    public class ItemResource
    {
        public Guid Id { get; set; }

        public DateTime? ReceivedDate { get; set; }

        public DateTime? ExpirationDate { get; set; }

        public string Barcode { get; set; }

        public IList<ProductItem> ProductItems { get; set; }
        public IList<InvoiceItem> InvoiceItems { get; set; }
    }
}