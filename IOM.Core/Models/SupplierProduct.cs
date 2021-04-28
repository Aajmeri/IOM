using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOM.Core.Models
{
    public class SupplierProduct : Base
    {
        public Guid SupplierId { get; set; }

        public Supplier Supplier { get; set; }

        public Guid ProductId { get; set; }

        public Product Product { get; set; }
    }
}
