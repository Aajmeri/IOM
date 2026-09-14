using System;

namespace IOM.Core.Models
{
    public class OrderItem
    {
        public Guid OrderId { get; set; }

        public Order Order { get; set; }

        public Guid ProductId { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }

        // Snapshot of the product's price at the moment this line was added (either at order
        // creation or when the line was added during a later edit). Deliberately not recomputed
        // from Product.Price on read, so a later price change on the product never silently
        // alters the total of an existing order.
        public decimal UnitPrice { get; set; }
    }
}
