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
        Task<Product> GetByBarcodeAsync(string barcode);

        /// <summary>
        /// Removes a tracked SupplierProduct join row. Needed because the composite key
        /// (SupplierId, ProductId) means changing a product's supplier can't be done by mutating
        /// the tracked entity's SupplierId in place - the old row must be removed and a new one
        /// added instead.
        /// </summary>
        void RemoveSupplierProduct(SupplierProduct supplierProduct);
    }
}