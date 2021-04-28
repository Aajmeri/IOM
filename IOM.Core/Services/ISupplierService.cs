using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface ISupplierService
    {
        Task<IEnumerable<Supplier>> GetAllWithInvoiceSupplierAndSupplierProduct();
        Task<Supplier> CreateSupplier(Supplier newSupplier);
        Task UpdateSupplier(Supplier supplierToBeUpdated, Supplier supplier);
        Task DeleteSupplier(Supplier supplier);

    }
}