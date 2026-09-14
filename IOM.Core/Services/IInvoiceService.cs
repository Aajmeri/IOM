using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IInvoiceService
    {
        Task<IEnumerable<Invoice>> GetAllWithInvoiceSupplierAndInvoiceItems();
        Task<IEnumerable<Invoice>> GetByInvoiceSupplierId(InvoiceSupplier invoiceSupplier);
        Task<Invoice> GetById(Guid id);
        Task<Invoice> CreateInvoice(Invoice newInvoice);
        Task UpdateInvoice(Invoice invoiceToBeUpdated, Invoice invoice);
        Task DeleteInvoice(Invoice invoice);

        /// <summary>
        /// Parses a shipping-order CSV (Barcode,ProductName,Quantity,ExpirationDate,Price),
        /// creating Products/Items/Invoice as needed. See CSV contract in CLAUDE task notes.
        /// </summary>
        Task<InvoiceUploadResult> UploadShippingOrder(Guid supplierId, string invoiceNumber, Stream csvStream);
    }
}