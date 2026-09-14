using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IOM.Core.Models;
using IOM.Core.Repositories;

namespace IOM.Data.Repositories
{
    public class DeliveryRepository : Repository<Delivery>, IDeliveryRepository
    {
        public DeliveryRepository(IOMContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<Delivery>> SearchAsync(DateTime? from, DateTime? to, Guid? supplierId, DeliveryStatus? status, string keyword)
        {
            var query = IOMContext.Deliveries
                .Include(d => d.Supplier)
                .AsQueryable();

            if (from.HasValue)
                query = query.Where(d => d.ScheduledDate >= from.Value);

            if (to.HasValue)
                query = query.Where(d => d.ScheduledDate <= to.Value);

            if (supplierId.HasValue)
                query = query.Where(d => d.SupplierId == supplierId.Value);

            if (status.HasValue)
                query = query.Where(d => d.Status == status.Value);

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                var normalized = keyword.ToLower();
                query = query.Where(d =>
                    (d.Supplier != null && d.Supplier.Name.ToLower().Contains(normalized)) ||
                    (d.Notes != null && d.Notes.ToLower().Contains(normalized)));
            }

            return await query
                .OrderBy(d => d.ScheduledDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Delivery>> GetByDateRangeAsync(DateTime start, DateTime end)
        {
            return await IOMContext.Deliveries
                .Include(d => d.Supplier)
                .Where(d => d.ScheduledDate >= start && d.ScheduledDate <= end)
                .OrderBy(d => d.ScheduledDate)
                .ToListAsync();
        }

        public async Task<Delivery> GetByIdWithSupplierAsync(Guid id)
        {
            return await IOMContext.Deliveries
                .Include(d => d.Supplier)
                .SingleOrDefaultAsync(d => d.Id == id);
        }

        private IOMContext IOMContext
        {
            get { return Context as IOMContext; }
        }
    }
}
