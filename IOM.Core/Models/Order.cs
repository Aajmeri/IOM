using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IOM.Core.Models
{
    public class Order : Base
    {
        [Key]
        public Guid Id { get; set; }

        public string Number { get; set; }

        public Guid ClientId { get; set; }
        public User Client { get; set; }

        public DateTime ScheduledDate { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        public string Notes { get; set; }

        public string AdminNotes { get; set; }

        public IList<OrderItem> OrderItems { get; set; }
    }

    public enum OrderStatus
    {
        Pending,
        Approved,
        Rejected,
        Cancelled
    }
}
