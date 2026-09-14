using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Repositories
{
    public interface ISupplierRepsoitory : IRepository<Supplier>
    {

        Task<IEnumerable<Supplier>> GetAllWithInvoiceSupplierAndSupplierProductAsync();

        Task<IEnumerable<Supplier>> SearchByNameAsync(string query, int limit);

    }
}