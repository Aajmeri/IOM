using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IOM.Core.Models;
using IOM.Core.Repositories;
using System;

namespace IOM.Data.Repositories
{
    public class InvoiceRepository : Repository<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(IOMContext dbContext) : base(dbContext)
        {
            
        }

        public async Task<IEnumerable<Invoice>> GetAllWithInvoiceSupplierAndInvoiceItemsAsync()
        {
            return await IOMContext.Invoices
                .Include(i => i.InvoiceSuppliers)
                .Include(i => i.InvoiceItems)   
                .ToListAsync();
        }

        public async Task<IEnumerable<Invoice>> GetByInvoiceSupplierIdAsync(InvoiceSupplier invoiceSupplier)
        {
            return await IOMContext.Invoices
                .Where(i => i.InvoiceSuppliers == invoiceSupplier) 
                .ToListAsync();
        }

        // public async Task<IEnumerable<Invoice>> GetAllWithSupplierIdAsync(Guid id)
        // {
        //     return await IOMContext.Invoices
        //         .Include(i => i.InvoiceSupplier)
        //         .Where(i => i.SupplierId == id)   
        //         .ToListAsync();
        // }

        // public async  Task<Invoice> GetMostRecentWithSupplierByIdAsync(Guid id)
        // {
        //     return await IOMContext.Invoices
        //         .Include(i => i.Supplier)
        //         .Where(i => i.SupplierId == id)
        //         .OrderByDescending(i => i.CreatedDate)   
        //         .SingleOrDefaultAsync();
        // }
 
        private IOMContext IOMContext
        {
            get { return Context as IOMContext;}
        }
    }
}