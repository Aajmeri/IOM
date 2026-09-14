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
    public class SupplierServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<ISupplierRepsoitory> _suppliers = new();

        private SupplierService CreateService()
        {
            _unitOfWork.SetupGet(u => u.Suppliers).Returns(_suppliers.Object);
            return new SupplierService(_unitOfWork.Object);
        }

        [Fact]
        public async Task Search_DelegatesToRepositoryWithQueryAndLimit()
        {
            var suppliers = new List<Supplier> { new Supplier { Name = "Acme" } };
            _suppliers.Setup(s => s.SearchByNameAsync("acme", 10)).ReturnsAsync(suppliers);
            var service = CreateService();

            var result = await service.Search("acme", 10);

            Assert.Same(suppliers, result);
            _suppliers.Verify(s => s.SearchByNameAsync("acme", 10), Times.Once);
        }

        [Fact]
        public async Task CreateSupplier_SetsActiveTrueAndAuditFields()
        {
            var newSupplier = new Supplier { Name = "New Co" };
            var service = CreateService();

            var result = await service.CreateSupplier(newSupplier);

            Assert.True(result.Active);
            Assert.True(result.CreatedDate > DateTime.MinValue);
            Assert.True(result.UpdatedDate > DateTime.MinValue);
            _suppliers.Verify(s => s.AddAsync(newSupplier), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateSupplier_UpdatesNameButNeverStompsActive()
        {
            var supplierToBeUpdated = new Supplier { Name = "Old Name", Active = true };
            // Mirrors what SaveSupplierResource -> domain mapping actually produces: Active is
            // never bound from the wire, so it defaults to false here.
            var incoming = new Supplier { Name = "New Name", Active = false };
            var service = CreateService();

            await service.UpdateSupplier(supplierToBeUpdated, incoming);

            Assert.Equal("New Name", supplierToBeUpdated.Name);
            Assert.True(supplierToBeUpdated.Active, "UpdateSupplier must never stomp Active with the (always-false) incoming value.");
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateSupplier_WithInvoiceSuppliersAndSupplierProduct_ReplacesCollections()
        {
            var supplierToBeUpdated = new Supplier { Name = "Old" };
            var invoiceSuppliers = new List<InvoiceSupplier> { new InvoiceSupplier() };
            var supplierProducts = new List<SupplierProduct> { new SupplierProduct() };
            var incoming = new Supplier
            {
                Name = "New",
                InvoiceSuppliers = invoiceSuppliers,
                SupplierProduct = supplierProducts
            };
            var service = CreateService();

            await service.UpdateSupplier(supplierToBeUpdated, incoming);

            Assert.Same(invoiceSuppliers, supplierToBeUpdated.InvoiceSuppliers);
            Assert.Same(supplierProducts, supplierToBeUpdated.SupplierProduct);
        }

        [Fact]
        public async Task DeleteSupplier_RemovesAndCommits()
        {
            var supplier = new Supplier { Id = Guid.NewGuid() };
            var service = CreateService();

            await service.DeleteSupplier(supplier);

            _suppliers.Verify(s => s.Remove(supplier), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }
    }
}
