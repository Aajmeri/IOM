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

        /// <summary>
        /// Checkout: validates the order (items, slot), charges the card for the server-computed
        /// total and only then persists the order with its <see cref="Payment"/>. A declined card
        /// comes back as an error and nothing is saved.
        /// </summary>
        Task<(Order order, string error)> CreateOrder(
            Guid clientId,
            DateTime scheduledDate,
            string notes,
            IEnumerable<(Guid productId, int quantity)> items,
            CardDetails card);

        /// <summary>
        /// "Pay later" checkout: same validation as <see cref="CreateOrder"/>, but no card is
        /// charged and the order is saved without a <see cref="Payment"/>.
        /// </summary>
        Task<(Order order, string error)> CreateOrderPayLater(
            Guid clientId,
            DateTime scheduledDate,
            string notes,
            IEnumerable<(Guid productId, int quantity)> items);

        /// <summary>Pays for an unpaid (pay-later) order. A decline saves nothing.</summary>
        Task<(Order order, string error)> PayOrder(Order order, CardDetails card);

        /// <summary>
        /// Staff moves a Pending/Approved order to a different valid, non-full delivery slot.
        /// The order keeps its status; a non-empty reason is stored as the AdminNotes.
        /// </summary>
        Task<(Order order, string error)> RescheduleOrder(Order order, DateTime newScheduledDate, string reason);

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
