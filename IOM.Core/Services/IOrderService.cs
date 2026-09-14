using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAll();
        Task<IEnumerable<Order>> GetByClientId(Guid clientId);
        Task<Order> GetById(Guid id);

        Task<(Order order, string error)> CreateOrder(
            Guid clientId,
            DateTime scheduledDate,
            string notes,
            IEnumerable<(Guid productId, int quantity)> items);

        Task<(Order order, string error)> UpdateOrder(
            Order existing,
            DateTime scheduledDate,
            string notes,
            IEnumerable<(Guid productId, int quantity)> items);

        Task<(Order order, string error)> ApproveOrder(Order order, string adminNotes);
        Task<(Order order, string error)> RejectOrder(Order order, string adminNotes);
        Task CancelOrder(Order order);
    }
}
