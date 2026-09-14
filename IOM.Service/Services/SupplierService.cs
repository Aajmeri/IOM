using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<Supplier> GetById(Guid id)
        {
            return await _unitOfWork.Suppliers.GetByIdAsync(id);
        }
        public async Task<IEnumerable<Supplier>> Search(string query, int limit = 20)
        {
            return await _unitOfWork.Suppliers.SearchByNameAsync(query, limit);
        }
        public async Task<Supplier> CreateSupplier(Supplier newSupplier)
        {
            // Fixed from a pre-existing bug: Active was never set on create, so newly created
            // suppliers defaulted to Active=false and were invisible to SearchByNameAsync's
            // `Active == true` filter (blocking the new suppliers-search/typeahead feature).
            newSupplier.CreatedDate = DateTime.UtcNow;
            newSupplier.UpdatedDate = DateTime.UtcNow;
            newSupplier.Active = true;
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

             if(supplier.SupplierProduct != null)
            {
              supplierTobeUpdated.SupplierProduct = supplier.SupplierProduct;
            }

            // Fixed from a pre-existing bug: this used to also do
            // `supplierTobeUpdated.Active = supplier.Active;`, but SaveSupplierResource (the
            // actual bound type for PUT api/suppliers/{id}) has no Active field, so `supplier`
            // here always has Active=false — that stomp would deactivate every supplier on any
            // name update via the new SuppliersApiController.
            supplierTobeUpdated.Name = supplier.Name;
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