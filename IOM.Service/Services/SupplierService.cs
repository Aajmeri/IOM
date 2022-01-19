using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;

namespace IOM.Service.Services
{
    public class SupplierService : ISupplierService
    {
      private readonly IUnitOfWork _unitOfWork;
    
        public SupplierService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Supplier>> GetAllWithInvoiceSupplierAndSupplierProduct()
        {
            return await _unitOfWork.Suppliers.GetAllWithInvoiceSupplierAndSupplierProductAsync();
        }
        public async Task<Supplier> CreateSupplier(Supplier newSupplier)
        {
            await _unitOfWork.Suppliers.AddAsync(newSupplier);
            await _unitOfWork.CommitAsync();
            return newSupplier;
        }
        public async Task UpdateSupplier(Supplier supplierTobeUpdated, Supplier supplier)
        {
             if(supplier.InvoiceSuppliers != null)
            {
            supplierTobeUpdated.InvoiceSuppliers = supplier.InvoiceSuppliers;
            }

             if(supplier.SupplierProducts != null)
            {
              supplierTobeUpdated.SupplierProducts = supplier.SupplierProducts;
            }
            
            supplierTobeUpdated.Name = supplier.Name;           
            supplierTobeUpdated.Name = supplier.Name;
            supplierTobeUpdated.Active = supplier.Active;
            supplierTobeUpdated.UpdatedDate = DateTime.UtcNow;
            // supplierTobeUpdated.UpdatedById = someuser

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteSupplier(Supplier supplier)
        {
            _unitOfWork.Suppliers.Remove(supplier);
            await _unitOfWork.CommitAsync();
        }

    }
}