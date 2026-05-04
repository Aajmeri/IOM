using System.Threading.Tasks;
using IOM.Core.Models;
using IOM.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace IOM.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IOMContext dbContext) : base(dbContext) { }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await IOMContext.Users
                .SingleOrDefaultAsync(u => u.Email == email);
        }

        private IOMContext IOMContext => Context as IOMContext;
    }
}
