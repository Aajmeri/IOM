using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Repositories
{
    public interface IInvoiceRepository : IRepository<Invoice>
    {
        Task<IEnumerable<Invoice>> GetAllWithInvoiceSupplierAndInvoiceItemsAsync();
        Task<IEnumerable<Invoice>> GetByInvoiceSupplierIdAsync(InvoiceSupplier invoiceSupplier);

        // Task<IEnumerable<Invoice>> GetAllWithSupplierIdAsync(Guid id);
        // Task<Invoice> GetMostRecentWithSupplierByIdAsync(Guid id);

    }
}