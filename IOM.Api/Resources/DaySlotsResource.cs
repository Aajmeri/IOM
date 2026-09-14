using System;
using System.Collections.Generic;

namespace IOM.Api.Resources
{
    public class DaySlotsResource
    {
        public DateTime Date { get; set; }
        public List<SlotResource> Slots { get; set; } = new List<SlotResource>();
    }
}
