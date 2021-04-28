using System;
using System.Threading.Tasks;
using IOM.Core.Repositories;

namespace IOM.Core
{
    public interface IUnitOfWork : IDisposable
    {
        ISupplierRepsoitory Suppliers {get; }
        IProductRepository Products { get; }
        IItemRepository Items { get; }
        IInvoiceRepository Invoices { get; }
        IUserRepository Users { get; }

        Task<int> CommitAsync();
    }
}