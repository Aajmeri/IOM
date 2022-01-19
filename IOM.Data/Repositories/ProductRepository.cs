using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IOM.Core.Models;
using IOM.Core.Repositories;
using System;

namespace IOM.Data.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(IOMContext dbContext) : base(dbContext)
        {
            
        }

        public async Task<Product> GetProductByIdAsync(Guid id)
        {
            return await IOMContext.Products
                .SingleOrDefaultAsync(i => i.Id == id);
        }
        public async Task<IEnumerable<Product>> GetAllWithSupplierProductAsync()
        {
            return await IOMContext.Products
                .Include(i => i.SupplierProducts)
                .Where(i => i.Active)
                .ToListAsync();
        }
        public async Task<IEnumerable<Product>> GetAllWithSupplierProductAndProductItemAsync()
        {
            return await IOMContext.Products
                .Include(i => i.ProductItems)
                .Include(i => i.SupplierProducts)
                .Where(i => i.Active)
                .ToListAsync();
        }
        // public async Task<IEnumerable<Product>> GetAllWithProductBarcodeAsync()
        // {
        //     return await IOMContext.Products
        //         .Include(i => i.ProductBarcodes)
        //         .ToListAsync();
        // }
 
        private IOMContext IOMContext
        {
            get { return Context as IOMContext;}
        }
    }
}