using System;
using System.Collections.Generic;

namespace IOM.Api.Resources
{
    public class SaveOrderResource
    {
        public DateTime ScheduledDate { get; set; }
        public string Notes { get; set; }
        public List<SaveOrderItemResource> Items { get; set; } = new List<SaveOrderItemResource>();
    }

    public class SaveOrderItemResource
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
