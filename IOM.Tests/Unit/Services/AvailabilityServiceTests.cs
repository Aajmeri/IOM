using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Repositories;
using IOM.Service.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class AvailabilityServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IOrderRepository> _orders = new();
        private readonly IConfiguration _configuration = new ConfigurationBuilder().Build();

        private AvailabilityService CreateService()
        {
            _unitOfWork.SetupGet(u => u.Orders).Returns(_orders.Object);
            _orders.Setup(o => o.CountActiveInSlotAsync(It.IsAny<DateTime>())).ReturnsAsync(0);
            return new AvailabilityService(_unitOfWork.Object, _configuration);
        }

        [Fact]
        public async Task GetAvailability_FullCalendarMonthGridRange_DoesNotError()
        {
            // A dayGridMonth view pads to full weeks, so a single visible month can request up
            // to ~42 days even though the bookable advance window (default 30 days) is smaller.
            var start = new DateTime(2026, 8, 30);
            var end = new DateTime(2026, 10, 11);
            var service = CreateService();

            var (days, error) = await service.GetAvailability(start, end);

            Assert.Null(error);
            Assert.Equal(43, days.Count());
        }

        [Fact]
        public async Task GetAvailability_ExcessiveRange_ReturnsError()
        {
            var start = new DateTime(2026, 1, 1);
            var end = start.AddDays(43);
            var service = CreateService();

            var (days, error) = await service.GetAvailability(start, end);

            Assert.Null(days);
            Assert.Contains("cannot exceed", error);
        }

        [Fact]
        public async Task GetAvailability_EndBeforeStart_ReturnsError()
        {
            var start = new DateTime(2026, 1, 10);
            var end = new DateTime(2026, 1, 1);
            var service = CreateService();

            var (days, error) = await service.GetAvailability(start, end);

            Assert.Null(days);
            Assert.Equal("The end date must not be before the start date.", error);
        }

        [Fact]
        public async Task GetAvailability_DaysBeyondAdvanceWindow_AreUnavailableWithoutQueryingCapacity()
        {
            var start = DateTime.Now.Date.AddDays(60);
            var end = start;
            var service = CreateService();

            var (days, error) = await service.GetAvailability(start, end);

            Assert.Null(error);
            Assert.All(days.Single().Slots, slot => Assert.False(slot.Available));
            _orders.Verify(o => o.CountActiveInSlotAsync(It.IsAny<DateTime>()), Times.Never);
        }
    }
}
