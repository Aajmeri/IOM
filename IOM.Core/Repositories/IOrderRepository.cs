using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<IEnumerable<Order>> GetAllWithDetailsAsync();
        Task<Order> GetByIdWithDetailsAsync(Guid id);
        Task<IEnumerable<Order>> GetByClientIdAsync(Guid clientId);

        /// <summary>
        /// Counts orders whose Status is Pending or Approved for the given slot start time -
        /// Rejected/Cancelled orders don't consume slot capacity.
        /// </summary>
        Task<int> CountActiveInSlotAsync(DateTime slotStart);

        /// <summary>
        /// Removes a tracked OrderItem join row (composite key OrderId/ProductId), mirroring
        /// IProductRepository.RemoveSupplierProduct - needed because an item can't be "moved"
        /// off an order by mutating its key in place.
        /// </summary>
        void RemoveOrderItem(OrderItem orderItem);
    }
}
