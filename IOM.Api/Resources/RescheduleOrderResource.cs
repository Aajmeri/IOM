using System;

namespace IOM.Api.Resources
{
    public class RescheduleOrderResource
    {
        public DateTime ScheduledDate { get; set; }

        // Optional; included in the email to the client and stored as the order's AdminNotes.
        public string Reason { get; set; }
    }
}
