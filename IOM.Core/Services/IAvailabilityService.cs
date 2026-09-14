using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IAvailabilityService
    {
        Task<(IEnumerable<DaySlots> days, string error)> GetAvailability(DateTime start, DateTime end);
    }
}
