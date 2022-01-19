using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IOM.Core.Models;
using IOM.Core.Repositories;

namespace IOM.Data.Repositories
{
    public class SupplierRepository : Repository<Supplier>, ISupplierRepsoitory
    {
        public SupplierRepository(IOMContext dbContext) : base(dbContext)
        {
            
        }

        public async  Task<IEnumerable<Supplier>> GetAllWithInvoiceSupplierAndSupplierProductAsync()

        {
            return await IOMContext.Suppliers
                .Include(x => x.SupplierProducts)
                .Include(x => x.InvoiceSuppliers)
                .ToListAsync();
        }

 
        private IOMContext IOMContext
        {
            get { return Context as IOMContext;}
        }
    }
}