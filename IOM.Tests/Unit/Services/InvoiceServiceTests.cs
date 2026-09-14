using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Repositories;
using IOM.Service.Services;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class InvoiceServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IInvoiceRepository> _invoices = new();
        private readonly Mock<IProductRepository> _products = new();
        private readonly Mock<ISupplierRepsoitory> _suppliers = new();

        private InvoiceService CreateService()
        {
            _unitOfWork.SetupGet(u => u.Invoices).Returns(_invoices.Object);
            _unitOfWork.SetupGet(u => u.Products).Returns(_products.Object);
            _unitOfWork.SetupGet(u => u.Suppliers).Returns(_suppliers.Object);
            return new InvoiceService(_unitOfWork.Object);
        }

        private static Stream CsvStream(string csv) => new MemoryStream(Encoding.UTF8.GetBytes(csv));

        private void SupplierExists(Guid supplierId) =>
            _suppliers.Setup(s => s.GetByIdAsync(supplierId)).ReturnsAsync(new Supplier { Id = supplierId });

        [Fact]
        public async Task UploadShippingOrder_UnknownSupplier_ReturnsRowErrorAndNoInvoice()
        {
            var supplierId = Guid.NewGuid();
            _suppliers.Setup(s => s.GetByIdAsync(supplierId)).ReturnsAsync((Supplier)null);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1", CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n123,Widget,5,,1.00"));

            Assert.Null(result.InvoiceId);
            Assert.Contains(result.RowErrors, e => e.Contains("does not exist"));
            _invoices.Verify(i => i.AddAsync(It.IsAny<Invoice>()), Times.Never);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Never);
        }

        [Fact]
        public async Task UploadShippingOrder_MissingRequiredHeaders_ReturnsRowError()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1", CsvStream("ProductName,Price\nWidget,1.00"));

            Assert.Null(result.InvoiceId);
            Assert.Contains(result.RowErrors, e => e.Contains("Barcode") && e.Contains("Quantity"));
        }

        [Fact]
        public async Task UploadShippingOrder_MalformedQuantity_RecordsRowErrorAndSkipsRow()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            _products.Setup(p => p.GetByBarcodeAsync("123")).ReturnsAsync((Product)null);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n123,Widget,notanumber,,1.00"));

            Assert.Null(result.InvoiceId);
            Assert.Contains(result.RowErrors, e => e.Contains("Row 1") && e.Contains("Quantity"));
            Assert.Equal(0, result.ItemsCreated);
        }

        [Fact]
        public async Task UploadShippingOrder_ZeroQuantity_IsRejected()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n123,Widget,0,,1.00"));

            Assert.Contains(result.RowErrors, e => e.Contains("positive integer"));
        }

        [Fact]
        public async Task UploadShippingOrder_MissingBarcode_RecordsRowError()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n,Widget,5,,1.00"));

            Assert.Contains(result.RowErrors, e => e.Contains("Row 1") && e.Contains("Barcode is required"));
        }

        [Fact]
        public async Task UploadShippingOrder_MissingProductNameForNewProduct_RecordsRowError()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            _products.Setup(p => p.GetByBarcodeAsync("123")).ReturnsAsync((Product)null);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n123,,5,,1.00"));

            Assert.Contains(result.RowErrors, e => e.Contains("Row 1") && e.Contains("ProductName is required"));
            Assert.Equal(0, result.ItemsCreated);
        }

        [Fact]
        public async Task UploadShippingOrder_InvalidExpirationDateFormat_RecordsRowError()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n123,Widget,5,01/01/2027,1.00"));

            Assert.Contains(result.RowErrors, e => e.Contains("ExpirationDate"));
        }

        [Fact]
        public async Task UploadShippingOrder_ValidNewProductRow_CreatesInvoiceAndUsesCsvPriceForTotal()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            _products.Setup(p => p.GetByBarcodeAsync("123")).ReturnsAsync((Product)null);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n123,Widget,5,2027-01-01,2.50"));

            Assert.NotNull(result.InvoiceId);
            Assert.Equal(1, result.ProductsCreated);
            Assert.Equal(0, result.ProductsMatched);
            Assert.Equal(1, result.ItemsCreated);
            Assert.Empty(result.RowErrors);

            _invoices.Verify(i => i.AddAsync(It.Is<Invoice>(inv =>
                inv.Number == "SO-1" &&
                inv.Total == (5 * 2.50m).ToString("F2", System.Globalization.CultureInfo.InvariantCulture) &&
                inv.InvoiceSupplier.Single().SupplierId == supplierId &&
                inv.InvoiceItem.Single().Item.Product.Barcode == "123" &&
                inv.InvoiceItem.Single().Item.Product.Name == "Widget" &&
                inv.InvoiceItem.Single().Item.Quantity == 5 &&
                inv.InvoiceItem.Single().Item.ExpirationDate == new DateTime(2027, 1, 1)
            )), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UploadShippingOrder_MatchedProductWithoutPrice_UsesExistingProductPriceForTotal()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            var existingProduct = new Product { Id = Guid.NewGuid(), Barcode = "999", Name = "Existing", Price = 4.00m };
            _products.Setup(p => p.GetByBarcodeAsync("999")).ReturnsAsync(existingProduct);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-2",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n999,,3,,"));

            Assert.Equal(0, result.ProductsCreated);
            Assert.Equal(1, result.ProductsMatched);
            _invoices.Verify(i => i.AddAsync(It.Is<Invoice>(inv =>
                inv.Total == (3 * 4.00m).ToString("F2", System.Globalization.CultureInfo.InvariantCulture)
            )), Times.Once);
        }

        [Fact]
        public async Task UploadShippingOrder_MatchedProductWithExplicitPrice_UsesRowPriceNotProductPrice()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            var existingProduct = new Product { Id = Guid.NewGuid(), Barcode = "999", Name = "Existing", Price = 4.00m };
            _products.Setup(p => p.GetByBarcodeAsync("999")).ReturnsAsync(existingProduct);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-2",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n999,,3,,10.00"));

            _invoices.Verify(i => i.AddAsync(It.Is<Invoice>(inv =>
                inv.Total == (3 * 10.00m).ToString("F2", System.Globalization.CultureInfo.InvariantCulture)
            )), Times.Once);
        }

        [Fact]
        public async Task UploadShippingOrder_DuplicateBarcodeWithinFile_CreatesOnlyOneNewProductButTwoItems()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            _products.Setup(p => p.GetByBarcodeAsync("123")).ReturnsAsync((Product)null);
            var service = CreateService();

            var csv = "Barcode,ProductName,Quantity,ExpirationDate,Price\n" +
                      "123,Widget,5,,1.00\n" +
                      "123,Widget,2,,1.00";

            var result = await service.UploadShippingOrder(supplierId, "SO-3", CsvStream(csv));

            Assert.Equal(1, result.ProductsCreated);
            Assert.Equal(1, result.ProductsMatched);
            Assert.Equal(2, result.ItemsCreated);
            Assert.Empty(result.RowErrors);

            _invoices.Verify(i => i.AddAsync(It.Is<Invoice>(inv =>
                inv.InvoiceItem.Count == 2 &&
                // Both items should reference the SAME Product instance created in-memory for
                // this upload, not two separate Product rows for the same barcode.
                ReferenceEquals(inv.InvoiceItem[0].Item.Product, inv.InvoiceItem[1].Item.Product) &&
                inv.Total == ((5 + 2) * 1.00m).ToString("F2", System.Globalization.CultureInfo.InvariantCulture)
            )), Times.Once);
        }

        [Fact]
        public async Task UploadShippingOrder_AllRowsInvalid_DoesNotCreateInvoice()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-4",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n,Widget,notanumber,,1.00"));

            Assert.Null(result.InvoiceId);
            _invoices.Verify(i => i.AddAsync(It.IsAny<Invoice>()), Times.Never);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Never);
        }

        [Fact]
        public async Task UploadShippingOrder_BlankInvoiceNumber_GeneratesFallbackNumber()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            _products.Setup(p => p.GetByBarcodeAsync("123")).ReturnsAsync((Product)null);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "  ",
                CsvStream("Barcode,ProductName,Quantity,ExpirationDate,Price\n123,Widget,1,,1.00"));

            _invoices.Verify(i => i.AddAsync(It.Is<Invoice>(inv => inv.Number.StartsWith("SO-"))), Times.Once);
        }

        [Fact]
        public async Task UploadShippingOrder_EmptyCsv_ReturnsRowError()
        {
            var supplierId = Guid.NewGuid();
            SupplierExists(supplierId);
            var service = CreateService();

            var result = await service.UploadShippingOrder(supplierId, "SO-1", CsvStream(""));

            Assert.Contains(result.RowErrors, e => e.Contains("empty"));
        }
    }
}
