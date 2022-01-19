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

        public async Task<IEnumerable<Item>> GetByProductIdAsync(Guid productId)
        {
            return await IOMContext.Item
                .Where(i => i.ProductItems.Any(x => x.ProductId == productId))
                // .Include(i => i.ProductItems.Where(i => i.ProductId == productId))
                .ToListAsync();
        }

        
        public async Task<IEnumerable<Item>> GetActiveAsync()
        {
            return await IOMContext.Item
                .Include(i => i.ProductItems)
                .ToListAsync();
        }

        // public async Task<IEnumerable<Item>> GetByProductIdAsync(Guid productId)
        // {
        //     return await IOMContext.Item
        //         .Include(i => i.Product)
        //         .Where(i => i.ProductId == productId)
        //         .ToListAsync();
        // }

        private IOMContext IOMContext
        {
            get { return Context as IOMContext; }
        }
    }
}