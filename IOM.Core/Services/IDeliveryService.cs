using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IDeliveryService
    {
        Task<Delivery> GetById(Guid id);
        Task<IEnumerable<Delivery>> Search(DateTime? from, DateTime? to, Guid? supplierId, DeliveryStatus? status, string keyword);
        Task<IEnumerable<Delivery>> GetByDateRange(DateTime start, DateTime end);
        Task<Delivery> CreateDelivery(Delivery newDelivery);
        Task UpdateDelivery(Delivery deliveryToBeUpdated, Delivery delivery);
        Task DeleteDelivery(Delivery delivery);
    }
}
