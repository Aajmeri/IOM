using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IUserService
    {
        // Task<IEnumerable<User>> GetAllWithSupplier();
        // Task<User> GetUserById(int id);
        // Task<IEnumerable<User>> GetUsersBySupplierId(int supplierId);
        Task<User> CreateUser(User newUser);
        Task UpdateUser(User userToBeUpdated, User user);
        Task DeleteUser(User user);

    }
}