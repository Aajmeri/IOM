using System;
using System.Collections.Generic;

namespace IOM.Api.Resources
{
    public class ProductResource
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public bool Visibility { get; set; }

        public string Barcode { get; set; }

        public Guid? SupplierId { get; set; }

        public string SupplierName { get; set; }
    }
}