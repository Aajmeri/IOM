using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;

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

    }
}