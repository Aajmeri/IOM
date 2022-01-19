using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOM.Core.Models
{
    public class ProductItem
    {
        public Guid ProductId { get; set; }

        public Product Product { get; set; }

        public Guid ItemId { get; set; }

        public Item Item { get; set; }
    }
}
