using System;
using System.ComponentModel.DataAnnotations;

namespace IOM.Core.Models
{
    public class Delivery : Base
    {
        [Key]
        public Guid Id { get; set; }

        public Guid SupplierId { get; set; }
        public Supplier Supplier { get; set; }

        public DateTime ScheduledDate { get; set; }

        public DeliveryStatus Status { get; set; } = DeliveryStatus.Scheduled;

        public Guid? InvoiceId { get; set; }
        public Invoice Invoice { get; set; }

        public string Notes { get; set; }
    }

    public enum DeliveryStatus
    {
        Scheduled,
        Completed,
        Cancelled,
        Delayed
    }
}
