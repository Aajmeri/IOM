using System;

namespace IOM.Api.Resources
{
    public class DeliveryResource
    {
        public Guid Id { get; set; }
        public Guid SupplierId { get; set; }
        public string SupplierName { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string Status { get; set; }
        public Guid? InvoiceId { get; set; }
        public string Notes { get; set; }
        public bool Active { get; set; }
    }
}
