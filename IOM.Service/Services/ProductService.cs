using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;

namespace IOM.Service.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<Product> GetProductById(Guid id)
        {
            return await _unitOfWork.Products.GetByIdAsync(id);
        }
        public async Task<IEnumerable<Product>> GetAllWithSupplierProduct()
        {
            return await _unitOfWork.Products.GetAllWithSupplierProductAsync();
        }
        public async Task<IEnumerable<Product>> GetAllWithSupplierProductAndProductItem()
        {
            return await _unitOfWork.Products.GetAllWithSupplierProductAndProductItemAsync();
        }
        public async Task<Product> CreateProduct(Product newProduct)
        {
            await _unitOfWork.Products.AddAsync(newProduct);
            await _unitOfWork.CommitAsync();
            return newProduct;
        }
        public async Task UpdateProduct(Product productTobeUpdated, Product product)
        {
            if (productTobeUpdated.SupplierProducts != null)
            {
                productTobeUpdated.SupplierProducts = product.SupplierProducts;
            }
            productTobeUpdated.Description = product.Description;
            productTobeUpdated.Name = product.Name;
            productTobeUpdated.Price = product.Price;
            productTobeUpdated.Active = product.Active;
            productTobeUpdated.UpdatedDate = DateTime.UtcNow;
            // productTobeUpdated.UpdatedById = someuser

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteProduct(Product product)
        {
            _unitOfWork.Products.Remove(product);
            await _unitOfWork.CommitAsync();
        }

    }
}