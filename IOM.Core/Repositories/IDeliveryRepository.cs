using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Repositories
{
    public interface IDeliveryRepository : IRepository<Delivery>
    {
        Task<IEnumerable<Delivery>> SearchAsync(DateTime? from, DateTime? to, Guid? supplierId, DeliveryStatus? status, string keyword);
        Task<IEnumerable<Delivery>> GetByDateRangeAsync(DateTime start, DateTime end);
        Task<Delivery> GetByIdWithSupplierAsync(Guid id);
    }
}
