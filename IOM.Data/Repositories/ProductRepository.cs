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
                .Include(p => p.SupplierProduct).ThenInclude(sp => sp.Supplier)
                .SingleOrDefaultAsync(i => i.Id == id);
        }
        public async Task<IEnumerable<Product>> GetAllWithSupplierProductAsync()
        {
            return await IOMContext.Products
                .Include(i => i.SupplierProduct).ThenInclude(sp => sp.Supplier)
                .ToListAsync();
        }

        public async Task<Product> GetByBarcodeAsync(string barcode)
        {
            // FirstOrDefaultAsync (not SingleOrDefaultAsync) is a deliberate defensive choice:
            // the Barcode column now has a unique index (see IOMContext), but if any duplicate
            // barcodes already exist in seed/dev data from before that index was added, this
            // lookup should still degrade gracefully (pick one) rather than throwing
            // InvalidOperationException and taking down barcode scan/CSV upload with a 500.
            return await IOMContext.Products
                .Include(p => p.SupplierProduct).ThenInclude(sp => sp.Supplier)
                .FirstOrDefaultAsync(p => p.Barcode.ToLower() == barcode.ToLower());
        }

        public void RemoveSupplierProduct(SupplierProduct supplierProduct)
        {
            IOMContext.Set<SupplierProduct>().Remove(supplierProduct);
        }


        private IOMContext IOMContext
        {
            get { return Context as IOMContext;}
        }
    }
}