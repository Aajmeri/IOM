using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IInvoiceService
    {
        Task<IEnumerable<Invoice>> GetAllWithInvoiceSupplierAndInvoiceItems();
        Task<IEnumerable<Invoice>> GetByInvoiceSupplierId(InvoiceSupplier invoiceSupplier);
        Task<Invoice> CreateInvoice(Invoice newInvoice);
        Task UpdateInvoice(Invoice invoiceToBeUpdated, Invoice invoice);
        Task DeleteInvoice(Invoice invoice);
    }
}