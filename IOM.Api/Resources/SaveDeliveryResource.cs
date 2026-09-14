using System;

namespace IOM.Api.Resources
{
    public class SaveDeliveryResource
    {
        public Guid SupplierId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string Status { get; set; } = "Scheduled";
        public Guid? InvoiceId { get; set; }
        public string Notes { get; set; }
    }
}
