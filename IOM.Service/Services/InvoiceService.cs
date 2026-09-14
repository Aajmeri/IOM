using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;
using IOM.Service.Helpers;

namespace IOM.Service.Services
{
    public class InvoiceService : IInvoiceService
    {
      private readonly IUnitOfWork _unitOfWork;

        public InvoiceService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Invoice>> GetAllWithInvoiceSupplierAndInvoiceItems()
        {
            return await _unitOfWork.Invoices.GetAllWithInvoiceSupplierAndInvoiceItemsAsync();
        }
        public async Task<IEnumerable<Invoice>> GetByInvoiceSupplierId(InvoiceSupplier invoiceSupplier)
        {
            return await _unitOfWork.Invoices.GetByInvoiceSupplierIdAsync(invoiceSupplier);
        }
        public async Task<Invoice> GetById(Guid id)
        {
            return await _unitOfWork.Invoices.GetByIdWithDetailsAsync(id);
        }
        public async Task<Invoice> CreateInvoice(Invoice newInvoice)
        {
            newInvoice.CreatedDate = DateTime.UtcNow;
            // newInvoice.CreatedById = someuser
            await _unitOfWork.Invoices.AddAsync(newInvoice);
            await _unitOfWork.CommitAsync();
            return newInvoice;
        }
        public async Task UpdateInvoice(Invoice invoiceTobeUpdated, Invoice invoice)
        {
            if(invoiceTobeUpdated.InvoiceItem != null)
            {
            invoiceTobeUpdated.InvoiceItem = invoice.InvoiceItem;
            }
             if(invoiceTobeUpdated.InvoiceSupplier != null)
            {
            invoiceTobeUpdated.InvoiceSupplier = invoice.InvoiceSupplier;
            }
            invoiceTobeUpdated.UpdatedDate = DateTime.UtcNow;
            // invoiceTobeUpdated.UpdatedById = someuser

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteInvoice(Invoice invoice)
        {
            _unitOfWork.Invoices.Remove(invoice);
            await _unitOfWork.CommitAsync();
        }

        public async Task<InvoiceUploadResult> UploadShippingOrder(Guid supplierId, string invoiceNumber, Stream csvStream)
        {
            var result = new InvoiceUploadResult();
            // Tracks products created earlier in *this* upload (keyed by barcode) so repeated
            // barcodes for a brand-new product within the same file don't create duplicates.
            var newProductsByBarcode = new Dictionary<string, Product>(StringComparer.OrdinalIgnoreCase);
            var createdItems = new List<Item>();
            var invoiceTotal = 0m;

            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(supplierId);
            if (supplier == null)
            {
                result.RowErrors.Add($"Supplier '{supplierId}' does not exist.");
                return result;
            }

            using var reader = new StreamReader(csvStream);
            var headerLine = await reader.ReadLineAsync();
            if (string.IsNullOrWhiteSpace(headerLine))
            {
                result.RowErrors.Add("CSV file is empty or missing a header row.");
                return result;
            }

            var headers = CsvHelper.SplitLine(headerLine).Select(h => h.Trim()).ToList();
            int IndexOf(string name) => headers.FindIndex(h => string.Equals(h, name, StringComparison.OrdinalIgnoreCase));

            var barcodeIdx = IndexOf("Barcode");
            var productNameIdx = IndexOf("ProductName");
            var quantityIdx = IndexOf("Quantity");
            var expirationIdx = IndexOf("ExpirationDate");
            var priceIdx = IndexOf("Price");

            if (barcodeIdx < 0 || quantityIdx < 0)
            {
                result.RowErrors.Add("CSV header must include 'Barcode' and 'Quantity' columns (Header row required: Barcode,ProductName,Quantity,ExpirationDate,Price).");
                return result;
            }

            static string Field(IReadOnlyList<string> fields, int idx) =>
                idx >= 0 && idx < fields.Count ? fields[idx]?.Trim() : null;

            var rowNumber = 0;
            string line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                rowNumber++;
                if (string.IsNullOrWhiteSpace(line)) continue;

                var fields = CsvHelper.SplitLine(line);

                var barcode = Field(fields, barcodeIdx);
                if (string.IsNullOrWhiteSpace(barcode))
                {
                    result.RowErrors.Add($"Row {rowNumber}: Barcode is required");
                    continue;
                }

                var quantityStr = Field(fields, quantityIdx);
                if (!int.TryParse(quantityStr, NumberStyles.Integer, CultureInfo.InvariantCulture, out var quantity) || quantity <= 0)
                {
                    result.RowErrors.Add($"Row {rowNumber}: Quantity must be a positive integer");
                    continue;
                }

                DateTime? expirationDate = null;
                var expirationStr = Field(fields, expirationIdx);
                if (!string.IsNullOrWhiteSpace(expirationStr))
                {
                    if (!DateTime.TryParseExact(expirationStr, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDate))
                    {
                        result.RowErrors.Add($"Row {rowNumber}: ExpirationDate must be in yyyy-MM-dd format");
                        continue;
                    }
                    expirationDate = parsedDate;
                }

                var price = 0m;
                var priceStr = Field(fields, priceIdx);
                if (!string.IsNullOrWhiteSpace(priceStr) && !decimal.TryParse(priceStr, NumberStyles.Number, CultureInfo.InvariantCulture, out price))
                {
                    result.RowErrors.Add($"Row {rowNumber}: Price must be a decimal number");
                    continue;
                }

                Product product;
                if (!newProductsByBarcode.TryGetValue(barcode, out product))
                {
                    product = await _unitOfWork.Products.GetByBarcodeAsync(barcode);
                }

                if (product == null)
                {
                    var productName = Field(fields, productNameIdx);
                    if (string.IsNullOrWhiteSpace(productName))
                    {
                        result.RowErrors.Add($"Row {rowNumber}: ProductName is required to create a new product for barcode '{barcode}'");
                        continue;
                    }

                    product = new Product
                    {
                        Barcode = barcode,
                        Name = productName,
                        Price = price,
                        Visibility = true,
                        Quantity = 0,
                        CreatedDate = DateTime.UtcNow,
                        UpdatedDate = DateTime.UtcNow,
                        Active = true
                    };
                    newProductsByBarcode[barcode] = product;
                    result.ProductsCreated++;
                }
                else
                {
                    result.ProductsMatched++;
                }

                // Use the CSV row's Price when present (for a newly-created product this is the
                // same "price" value used above); otherwise fall back to the product's own price
                // so rows matching an existing product still contribute to the invoice Total.
                var rowHasPrice = !string.IsNullOrWhiteSpace(priceStr);
                var effectivePrice = rowHasPrice ? price : product.Price;
                invoiceTotal += effectivePrice * quantity;

                var item = new Item
                {
                    Product = product,
                    Quantity = quantity,
                    ExpirationDate = expirationDate,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                    Active = true
                };
                createdItems.Add(item);
            }

            if (createdItems.Count == 0)
            {
                return result;
            }

            var invoice = new Invoice
            {
                Number = string.IsNullOrWhiteSpace(invoiceNumber) ? $"SO-{DateTime.UtcNow:yyyyMMddHHmmss}" : invoiceNumber,
                Total = invoiceTotal.ToString("F2", CultureInfo.InvariantCulture),
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow,
                Active = true,
                InvoiceSupplier = new List<InvoiceSupplier> { new InvoiceSupplier { SupplierId = supplierId } },
                InvoiceItem = createdItems.Select(i => new InvoiceItem { Item = i }).ToList()
            };

            await _unitOfWork.Invoices.AddAsync(invoice);
            await _unitOfWork.CommitAsync();

            result.InvoiceId = invoice.Id;
            result.ItemsCreated = createdItems.Count;
            return result;
        }

    }
}