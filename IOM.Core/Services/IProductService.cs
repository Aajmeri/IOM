using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IProductService
    {
        Task<Product> GetProductById(Guid id);
        Task<IEnumerable<Product>> GetAllWithSupplierProduct();
        Task<Product> CreateProduct(Product newProduct);
        Task UpdateProduct(Product productToBeUpdated, Product product);

        Task DeleteProduct(Product product);

    }

}