using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Repositories;
using IOM.Service.Services;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class DeliveryServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IDeliveryRepository> _deliveries = new();

        private DeliveryService CreateService()
        {
            _unitOfWork.SetupGet(u => u.Deliveries).Returns(_deliveries.Object);
            return new DeliveryService(_unitOfWork.Object);
        }

        [Fact]
        public async Task Search_PassesAllFiltersThrough()
        {
            var from = new DateTime(2026, 1, 1);
            var to = new DateTime(2026, 2, 1);
            var supplierId = Guid.NewGuid();
            var status = DeliveryStatus.Scheduled;
            var deliveries = new List<Delivery> { new Delivery() };
            _deliveries.Setup(d => d.SearchAsync(from, to, supplierId, status, "keyword")).ReturnsAsync(deliveries);
            var service = CreateService();

            var result = await service.Search(from, to, supplierId, status, "keyword");

            Assert.Same(deliveries, result);
            _deliveries.Verify(d => d.SearchAsync(from, to, supplierId, status, "keyword"), Times.Once);
        }

        [Fact]
        public async Task GetByDateRange_DelegatesToRepository()
        {
            var start = new DateTime(2026, 1, 1);
            var end = new DateTime(2026, 1, 31);
            var deliveries = new List<Delivery> { new Delivery() };
            _deliveries.Setup(d => d.GetByDateRangeAsync(start, end)).ReturnsAsync(deliveries);
            var service = CreateService();

            var result = await service.GetByDateRange(start, end);

            Assert.Same(deliveries, result);
        }

        [Fact]
        public async Task CreateDelivery_SetsAuditFieldsAndActive()
        {
            var newDelivery = new Delivery { SupplierId = Guid.NewGuid() };
            var service = CreateService();

            var result = await service.CreateDelivery(newDelivery);

            Assert.True(result.Active);
            Assert.True(result.CreatedDate > DateTime.MinValue);
            _deliveries.Verify(d => d.AddAsync(newDelivery), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateDelivery_UpdatesAllMutableFields()
        {
            var deliveryToBeUpdated = new Delivery { SupplierId = Guid.NewGuid(), Status = DeliveryStatus.Scheduled };
            var newSupplierId = Guid.NewGuid();
            var newInvoiceId = Guid.NewGuid();
            var scheduledDate = new DateTime(2026, 5, 1);
            var incoming = new Delivery
            {
                SupplierId = newSupplierId,
                ScheduledDate = scheduledDate,
                Status = DeliveryStatus.Completed,
                InvoiceId = newInvoiceId,
                Notes = "Delivered early"
            };
            var service = CreateService();

            await service.UpdateDelivery(deliveryToBeUpdated, incoming);

            Assert.Equal(newSupplierId, deliveryToBeUpdated.SupplierId);
            Assert.Equal(scheduledDate, deliveryToBeUpdated.ScheduledDate);
            Assert.Equal(DeliveryStatus.Completed, deliveryToBeUpdated.Status);
            Assert.Equal(newInvoiceId, deliveryToBeUpdated.InvoiceId);
            Assert.Equal("Delivered early", deliveryToBeUpdated.Notes);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task DeleteDelivery_RemovesAndCommits()
        {
            var delivery = new Delivery { Id = Guid.NewGuid() };
            var service = CreateService();

            await service.DeleteDelivery(delivery);

            _deliveries.Verify(d => d.Remove(delivery), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }
    }
}
