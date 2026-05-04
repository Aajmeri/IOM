using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<Product> CreateProduct(Product newProduct)
        {
            newProduct.CreatedDate = DateTime.UtcNow;
            newProduct.UpdatedDate = DateTime.UtcNow;
            newProduct.Active = true;
            await _unitOfWork.Products.AddAsync(newProduct);
            await _unitOfWork.CommitAsync();
            return newProduct;
        }
        public async Task UpdateProduct(Product productTobeUpdated, Product product)
        {
            if (productTobeUpdated.SupplierProduct != null)
                productTobeUpdated.SupplierProduct = product.SupplierProduct;
            productTobeUpdated.Name = product.Name;
            productTobeUpdated.Description = product.Description;
            productTobeUpdated.Price = product.Price;
            productTobeUpdated.Quantity = product.Quantity;
            productTobeUpdated.Visibility = product.Visibility;
            productTobeUpdated.UpdatedDate = DateTime.UtcNow;
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteProduct(Product product)
        {
            _unitOfWork.Products.Remove(product);
            await _unitOfWork.CommitAsync();
        }

    }
}