using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Repositories
{
    public interface IItemRepository : IRepository<Item>
    {
        Task<IEnumerable<Item>> GetAllWithProductsAsync();
        Task<IEnumerable<Item>> GetByProductIdAsync(Guid productId);
    }
}