using System;
using System.Collections.Generic;

namespace IOM.Core.Models
{
    // Availability result shapes. Deliberately not persisted entities - just the computed
    // output of IAvailabilityService.GetAvailability. Only expose whether a slot is bookable;
    // never leak *why* it's blocked or *what* is booked in it.
    public class DaySlots
    {
        public DateTime Date { get; set; }
        public IList<SlotAvailability> Slots { get; set; } = new List<SlotAvailability>();
    }

    public class SlotAvailability
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool Available { get; set; }
    }
}
