using System;
using System.Collections.Generic;
using IOM.Core.Models;

namespace IOM.Api.Resources
{
    public class ProductResource
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public decimal? Quantity { get; set; }

         public IList<SupplierProduct> SupplierProducts { get; set; }
         public IList<ProductItem> ProductItems { get; set; }

    }
}