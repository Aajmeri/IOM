using IOM.Core.Models;

namespace IOM.Core.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        // Task<IEnumerable<User>> GetAllWithProductsAsync();
        // Task<IEnumerable<User>> GetAllWithSuppliersAsync();
        // Task<IEnumerable<User>> GetAllWithInvoicesAsync();
    }
}