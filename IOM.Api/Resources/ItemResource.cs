using System;

namespace IOM.Api.Resources
{
    public class ItemResource
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public string Barcode { get; set; }
        public int Quantity { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public bool Active { get; set; }
    }
}
