using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;

namespace IOM.Service.Services
{
    public class DeliveryService : IDeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeliveryService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Delivery> GetById(Guid id)
        {
            return await _unitOfWork.Deliveries.GetByIdWithSupplierAsync(id);
        }

        public async Task<IEnumerable<Delivery>> Search(DateTime? from, DateTime? to, Guid? supplierId, DeliveryStatus? status, string keyword)
        {
            return await _unitOfWork.Deliveries.SearchAsync(from, to, supplierId, status, keyword);
        }

        public async Task<IEnumerable<Delivery>> GetByDateRange(DateTime start, DateTime end)
        {
            return await _unitOfWork.Deliveries.GetByDateRangeAsync(start, end);
        }

        public async Task<Delivery> CreateDelivery(Delivery newDelivery)
        {
            newDelivery.CreatedDate = DateTime.UtcNow;
            newDelivery.UpdatedDate = DateTime.UtcNow;
            newDelivery.Active = true;
            await _unitOfWork.Deliveries.AddAsync(newDelivery);
            await _unitOfWork.CommitAsync();
            return newDelivery;
        }

        public async Task UpdateDelivery(Delivery deliveryToBeUpdated, Delivery delivery)
        {
            deliveryToBeUpdated.SupplierId = delivery.SupplierId;
            deliveryToBeUpdated.ScheduledDate = delivery.ScheduledDate;
            deliveryToBeUpdated.Status = delivery.Status;
            deliveryToBeUpdated.InvoiceId = delivery.InvoiceId;
            deliveryToBeUpdated.Notes = delivery.Notes;
            deliveryToBeUpdated.UpdatedDate = DateTime.UtcNow;

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteDelivery(Delivery delivery)
        {
            _unitOfWork.Deliveries.Remove(delivery);
            await _unitOfWork.CommitAsync();
        }
    }
}
