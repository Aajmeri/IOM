using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IOM.Core.Models;
using IOM.Core.Repositories;
using System;

namespace IOM.Data.Repositories
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(IOMContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<Item>> GetAllWithProductsAsync()
        {
            return await IOMContext.Items
                .Include(i => i.Product)
                .ToListAsync();
        }

        public async Task<IEnumerable<Item>> GetByProductIdAsync(Guid productId)
        {
            return await IOMContext.Items
                .Include(i => i.Product)
                .Where(i => i.ProductId == productId)
                .ToListAsync();
        }

        public async Task<Item> GetByIdWithProductAsync(Guid id)
        {
            return await IOMContext.Items
                .Include(i => i.Product)
                .SingleOrDefaultAsync(i => i.Id == id);
        }

        private IOMContext IOMContext
        {
            get { return Context as IOMContext; }
        }
    }
}