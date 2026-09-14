using System;
using System.Collections.Generic;
using System.Linq;
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
            // Use the Include-ing repository method (not the base GetByIdAsync) so
            // SupplierProduct/Supplier are loaded for the flattened SupplierId/SupplierName
            // fields on ProductResource.
            return await _unitOfWork.Products.GetProductByIdAsync(id);
        }
        public async Task<IEnumerable<Product>> GetAllWithSupplierProduct()
        {
            return await _unitOfWork.Products.GetAllWithSupplierProductAsync();
        }
        public async Task<Product> GetByBarcode(string barcode)
        {
            if (string.IsNullOrWhiteSpace(barcode)) return null;
            return await _unitOfWork.Products.GetByBarcodeAsync(barcode);
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
            // productTobeUpdated.SupplierProduct is already tracked by the DbContext (it was
            // loaded via GetProductByIdAsync's Include). Assigning a brand-new list over it -
            // as this used to do - leaves the old tracked SupplierProduct row(s) untouched, which
            // either throws a "duplicate tracked key" error on SaveChangesAsync (when the
            // supplier is unchanged, since the new row has the same composite key as the still-
            // tracked old one) or leaves two SupplierProduct rows behind (when the supplier did
            // change). Mutate the tracked collection in place instead.
            var newSupplierProduct = product.SupplierProduct?.FirstOrDefault();
            if (newSupplierProduct != null)
            {
                productTobeUpdated.SupplierProduct ??= new List<SupplierProduct>();
                var existingSupplierProduct = productTobeUpdated.SupplierProduct.FirstOrDefault();

                if (existingSupplierProduct == null)
                {
                    productTobeUpdated.SupplierProduct.Add(new SupplierProduct
                    {
                        SupplierId = newSupplierProduct.SupplierId,
                        ProductId = productTobeUpdated.Id
                    });
                }
                else if (existingSupplierProduct.SupplierId != newSupplierProduct.SupplierId)
                {
                    // Composite PK is (SupplierId, ProductId), so the supplier can't be changed
                    // by mutating SupplierId in place - remove the old tracked row and add a new
                    // one instead.
                    productTobeUpdated.SupplierProduct.Remove(existingSupplierProduct);
                    _unitOfWork.Products.RemoveSupplierProduct(existingSupplierProduct);
                    productTobeUpdated.SupplierProduct.Add(new SupplierProduct
                    {
                        SupplierId = newSupplierProduct.SupplierId,
                        ProductId = productTobeUpdated.Id
                    });
                }
                // else: SupplierId unchanged - leave the tracked entity alone.
            }
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