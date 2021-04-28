using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Repositories;
using IOM.Data.Repositories;

namespace IOM.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IOMContext _context;
        private InvoiceRepository _invoiceRepository;
        private ItemRepository _itemRepository;
        private ProductRepository _productRepository;
        private SupplierRepository _supplierRepository;
        private UserRepository _userRepository;


        public UnitOfWork(IOMContext context)
        {
            this._context = context;
        }

        public IInvoiceRepository Invoices => _invoiceRepository = _invoiceRepository ?? new InvoiceRepository(_context);
        public IItemRepository Items => _itemRepository = _itemRepository ?? new ItemRepository(_context);
        public IProductRepository Products => _productRepository = _productRepository ?? new ProductRepository(_context);
        public ISupplierRepsoitory Suppliers => _supplierRepository = _supplierRepository ?? new SupplierRepository(_context);
        public IUserRepository Users => _userRepository = _userRepository ?? new UserRepository(_context);

      public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}