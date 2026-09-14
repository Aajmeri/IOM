using System;

namespace IOM.Api.Resources
{
    public class SaveItemResource
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime? ExpirationDate { get; set; }
    }
}
