using IOM.Core.Models;
using IOM.Core.Repositories;


namespace IOM.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IOMContext dbContext) : base(dbContext)
        {
            
        }

        // public async Task<IEnumerable<User>> GetAllWithProductsAsync()
        // {
        //     return await IOMContext.Users
        //         .Include(u => u.)
        // }
        // Task<IEnumerable<User>> GetAllWithSuppliersAsync();
        // Task<IEnumerable<User>> GetAllWithInvoicesAsync();

 
        private IOMContext IOMContext
        {
            get { return Context as IOMContext;}
        }
    }
}