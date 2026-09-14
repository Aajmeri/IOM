using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IOM.Core.Models;
using IOM.Core.Repositories;

namespace IOM.Data.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(IOMContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Order>> GetAllWithDetailsAsync()
        {
            return await IOMContext.Orders
                .Include(o => o.Client)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
                .OrderByDescending(o => o.CreatedDate)
                .ToListAsync();
        }

        public async Task<Order> GetByIdWithDetailsAsync(Guid id)
        {
            return await IOMContext.Orders
                .Include(o => o.Client)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
                .SingleOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Order>> GetByClientIdAsync(Guid clientId)
        {
            return await IOMContext.Orders
                .Include(o => o.Client)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
                .Where(o => o.ClientId == clientId)
                .OrderByDescending(o => o.CreatedDate)
                .ToListAsync();
        }

        public async Task<int> CountActiveInSlotAsync(DateTime slotStart)
        {
            return await IOMContext.Orders
                .Where(o => o.ScheduledDate == slotStart
                    && (o.Status == OrderStatus.Pending || o.Status == OrderStatus.Approved))
                .CountAsync();
        }

        public void RemoveOrderItem(OrderItem orderItem)
        {
            IOMContext.Set<OrderItem>().Remove(orderItem);
        }

        private IOMContext IOMContext
        {
            get { return Context as IOMContext; }
        }
    }
}
