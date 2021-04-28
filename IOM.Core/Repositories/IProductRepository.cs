using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {

        Task<Product> GetProductByIdAsync (Guid id);
        Task<IEnumerable<Product>> GetAllWithSupplierProductAsync();
    }
}