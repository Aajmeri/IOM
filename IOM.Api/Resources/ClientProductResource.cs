using System;

namespace IOM.Api.Resources
{
    // Deliberately narrow: no Barcode, SupplierId, or SupplierName - Clients must never see
    // supplier/sourcing details, only what they can order.
    public class ClientProductResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
