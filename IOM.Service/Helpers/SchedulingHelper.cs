using System;
using Microsoft.Extensions.Configuration;

namespace IOM.Service.Helpers
{
    /// <summary>
    /// Shared reads of the Scheduling:* config section (see appsettings.json), with hardcoded
    /// fallback defaults mirroring how Program.cs falls back on Jwt:Key. Used by both
    /// AvailabilityService and OrderService so the two never drift out of sync on what counts
    /// as a valid/bookable slot.
    /// </summary>
    public static class SchedulingHelper
    {
        public static int GetBusinessStartHour(IConfiguration configuration) => GetInt(configuration, "Scheduling:BusinessStartHour", 8);
        public static int GetBusinessEndHour(IConfiguration configuration) => GetInt(configuration, "Scheduling:BusinessEndHour", 18);
        public static int GetSlotLengthHours(IConfiguration configuration) => GetInt(configuration, "Scheduling:SlotLengthHours", 2);
        public static int GetSlotCapacity(IConfiguration configuration) => GetInt(configuration, "Scheduling:SlotCapacity", 3);
        public static int GetMinLeadTimeHours(IConfiguration configuration) => GetInt(configuration, "Scheduling:MinLeadTimeHours", 2);
        public static int GetMaxAdvanceDays(IConfiguration configuration) => GetInt(configuration, "Scheduling:MaxAdvanceDays", 30);

        /// <summary>
        /// True if scheduledDate's time-of-day exactly matches the start of one of the day's
        /// fixed slots (e.g. 08:00, 10:00, 12:00... with the default 8/18/2 configuration).
        /// </summary>
        public static bool IsAlignedSlotStart(DateTime scheduledDate, IConfiguration configuration)
        {
            var businessStartHour = GetBusinessStartHour(configuration);
            var businessEndHour = GetBusinessEndHour(configuration);
            var slotLengthHours = GetSlotLengthHours(configuration);

            var hoursFromMidnight = (scheduledDate - scheduledDate.Date).TotalHours;

            return hoursFromMidnight >= businessStartHour
                && hoursFromMidnight < businessEndHour
                && (hoursFromMidnight - businessStartHour) % slotLengthHours == 0;
        }

        private static int GetInt(IConfiguration configuration, string key, int fallback)
        {
            return int.TryParse(configuration[key], out var value) ? value : fallback;
        }
    }
}
