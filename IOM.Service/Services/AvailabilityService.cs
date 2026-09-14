using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;
using IOM.Service.Helpers;
using Microsoft.Extensions.Configuration;

namespace IOM.Service.Services
{
    public class AvailabilityService : IAvailabilityService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public AvailabilityService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        public async Task<(IEnumerable<DaySlots> days, string error)> GetAvailability(DateTime start, DateTime end)
        {
            if (end < start)
            {
                return (null, "The end date must not be before the start date.");
            }

            // Bound the requested range so a client can't force one CountActiveInSlotAsync DB
            // query per slot across an arbitrarily large window - cap it at the same
            // Scheduling:MaxAdvanceDays window that bounds how far out an order can actually be
            // scheduled, since anything further out is meaningless to ask about anyway.
            var maxRangeDays = SchedulingHelper.GetMaxAdvanceDays(_configuration);
            if ((end.Date - start.Date).TotalDays > maxRangeDays)
            {
                return (null, $"The requested date range cannot exceed {maxRangeDays} day(s).");
            }

            var businessStartHour = SchedulingHelper.GetBusinessStartHour(_configuration);
            var businessEndHour = SchedulingHelper.GetBusinessEndHour(_configuration);
            var slotLengthHours = SchedulingHelper.GetSlotLengthHours(_configuration);
            var slotCapacity = SchedulingHelper.GetSlotCapacity(_configuration);
            var minLeadTimeHours = SchedulingHelper.GetMinLeadTimeHours(_configuration);
            var maxAdvanceDays = SchedulingHelper.GetMaxAdvanceDays(_configuration);

            var now = DateTime.Now;
            var result = new List<DaySlots>();

            for (var date = start.Date; date <= end.Date; date = date.AddDays(1))
            {
                var daySlots = new DaySlots { Date = date };

                for (var hour = businessStartHour; hour < businessEndHour; hour += slotLengthHours)
                {
                    var slotStart = date.AddHours(hour);
                    var slotEnd = slotStart.AddHours(slotLengthHours);

                    var withinWindow = slotStart >= now.AddHours(minLeadTimeHours)
                        && slotStart <= now.AddDays(maxAdvanceDays);

                    var available = false;
                    if (withinWindow)
                    {
                        var activeCount = await _unitOfWork.Orders.CountActiveInSlotAsync(slotStart);
                        available = activeCount < slotCapacity;
                    }

                    daySlots.Slots.Add(new SlotAvailability
                    {
                        Start = slotStart,
                        End = slotEnd,
                        Available = available
                    });
                }

                result.Add(daySlots);
            }

            return (result, null);
        }
    }
}
