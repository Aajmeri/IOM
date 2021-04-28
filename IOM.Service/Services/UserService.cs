using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;

namespace IOM.Service.Services
{
    public class UserService : IUserService
    {
      private readonly IUnitOfWork _unitOfWork;
    
        public UserService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
 
        public async Task<User> CreateUser(User newUser)
        {
            await _unitOfWork.Users.AddAsync(newUser);
            await _unitOfWork.CommitAsync();
            return newUser;
        }
        public async Task UpdateUser(User userTobeUpdated, User user)
        {            
            userTobeUpdated.Name = user.Name;           
            userTobeUpdated.Name = user.Name;
            userTobeUpdated.Active = user.Active;
            userTobeUpdated.UpdatedDate = DateTime.UtcNow;
            // userTobeUpdated.UpdatedById = someuser

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteUser(User user)
        {
            _unitOfWork.Users.Remove(user);
            await _unitOfWork.CommitAsync();
        }

    }
}