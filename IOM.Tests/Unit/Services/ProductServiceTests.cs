using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Repositories;
using IOM.Service.Services;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class ProductServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IProductRepository> _products = new();

        private ProductService CreateService()
        {
            _unitOfWork.SetupGet(u => u.Products).Returns(_products.Object);
            return new ProductService(_unitOfWork.Object);
        }

        [Fact]
        public async Task GetProductById_DelegatesToIncludingRepositoryMethod()
        {
            var id = Guid.NewGuid();
            var product = new Product { Id = id };
            _products.Setup(p => p.GetProductByIdAsync(id)).ReturnsAsync(product);
            var service = CreateService();

            var result = await service.GetProductById(id);

            Assert.Same(product, result);
            _products.Verify(p => p.GetProductByIdAsync(id), Times.Once);
        }

        [Fact]
        public async Task GetByBarcode_WithWhitespace_ReturnsNullWithoutHittingRepository()
        {
            var service = CreateService();

            var result = await service.GetByBarcode("   ");

            Assert.Null(result);
            _products.Verify(p => p.GetByBarcodeAsync(It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task GetByBarcode_WithValue_DelegatesToRepository()
        {
            var product = new Product { Id = Guid.NewGuid(), Barcode = "12345" };
            _products.Setup(p => p.GetByBarcodeAsync("12345")).ReturnsAsync(product);
            var service = CreateService();

            var result = await service.GetByBarcode("12345");

            Assert.Same(product, result);
        }

        [Fact]
        public async Task CreateProduct_SetsAuditFieldsAndActive_ThenAddsAndCommits()
        {
            var newProduct = new Product { Name = "Widget" };
            var service = CreateService();

            var result = await service.CreateProduct(newProduct);

            Assert.True(result.Active);
            Assert.True(result.CreatedDate > DateTime.MinValue);
            Assert.True(result.UpdatedDate > DateTime.MinValue);
            _products.Verify(p => p.AddAsync(newProduct), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateProduct_ChangingSupplier_RemovesOldSupplierProductAndAddsNew()
        {
            var productId = Guid.NewGuid();
            var oldSupplierId = Guid.NewGuid();
            var newSupplierId = Guid.NewGuid();

            var existingSupplierProduct = new SupplierProduct { SupplierId = oldSupplierId, ProductId = productId };
            var productToBeUpdated = new Product
            {
                Id = productId,
                Name = "Old Name",
                SupplierProduct = new List<SupplierProduct> { existingSupplierProduct }
            };

            var incoming = new Product
            {
                Name = "New Name",
                Description = "New Description",
                Price = 9.99m,
                Quantity = 5,
                Visibility = false,
                SupplierProduct = new List<SupplierProduct> { new SupplierProduct { SupplierId = newSupplierId } }
            };

            var service = CreateService();

            await service.UpdateProduct(productToBeUpdated, incoming);

            Assert.Equal("New Name", productToBeUpdated.Name);
            Assert.Equal("New Description", productToBeUpdated.Description);
            Assert.Equal(9.99m, productToBeUpdated.Price);
            Assert.Equal(5, productToBeUpdated.Quantity);
            Assert.False(productToBeUpdated.Visibility);

            Assert.Single(productToBeUpdated.SupplierProduct);
            Assert.Equal(newSupplierId, productToBeUpdated.SupplierProduct[0].SupplierId);
            _products.Verify(p => p.RemoveSupplierProduct(existingSupplierProduct), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateProduct_SameSupplier_DoesNotRemoveTrackedSupplierProductRow()
        {
            var productId = Guid.NewGuid();
            var supplierId = Guid.NewGuid();
            var existingSupplierProduct = new SupplierProduct { SupplierId = supplierId, ProductId = productId };
            var productToBeUpdated = new Product
            {
                Id = productId,
                SupplierProduct = new List<SupplierProduct> { existingSupplierProduct }
            };
            var incoming = new Product
            {
                SupplierProduct = new List<SupplierProduct> { new SupplierProduct { SupplierId = supplierId } }
            };

            var service = CreateService();

            await service.UpdateProduct(productToBeUpdated, incoming);

            Assert.Single(productToBeUpdated.SupplierProduct);
            Assert.Same(existingSupplierProduct, productToBeUpdated.SupplierProduct[0]);
            _products.Verify(p => p.RemoveSupplierProduct(It.IsAny<SupplierProduct>()), Times.Never);
        }

        [Fact]
        public async Task DeleteProduct_RemovesAndCommits()
        {
            var product = new Product { Id = Guid.NewGuid() };
            var service = CreateService();

            await service.DeleteProduct(product);

            _products.Verify(p => p.Remove(product), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }
    }
}
