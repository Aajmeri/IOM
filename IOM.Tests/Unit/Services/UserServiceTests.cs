using System;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Repositories;
using IOM.Service.Helpers;
using IOM.Service.Services;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class UserServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IUserRepository> _users = new();

        private UserService CreateService()
        {
            _unitOfWork.SetupGet(u => u.Users).Returns(_users.Object);
            return new UserService(_unitOfWork.Object);
        }

        [Fact]
        public async Task CreateUser_HashesPasswordAndSetsAuditFields()
        {
            var newUser = new User { Email = "a@b.com", Password = "plaintext" };
            var service = CreateService();

            var result = await service.CreateUser(newUser);

            Assert.NotEqual("plaintext", result.Password);
            Assert.True(PasswordHelper.Verify("plaintext", result.Password));
            Assert.True(result.Active);
            _users.Verify(u => u.AddAsync(newUser), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateUser_UpdatesNameRoleAndActive()
        {
            var userToBeUpdated = new User { Name = "Old", Role = "Client", Active = false };
            var incoming = new User { Name = "New", Role = "Admin", Active = true };
            var service = CreateService();

            await service.UpdateUser(userToBeUpdated, incoming);

            Assert.Equal("New", userToBeUpdated.Name);
            Assert.Equal("Admin", userToBeUpdated.Role);
            Assert.True(userToBeUpdated.Active);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task DeleteUser_RemovesAndCommits()
        {
            var user = new User { Id = Guid.NewGuid() };
            var service = CreateService();

            await service.DeleteUser(user);

            _users.Verify(u => u.Remove(user), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task ValidateLoginAsync_UnknownEmail_ReturnsNull()
        {
            _users.Setup(u => u.GetByEmailAsync("nope@example.com")).ReturnsAsync((User)null);
            var service = CreateService();

            var result = await service.ValidateLoginAsync("nope@example.com", "whatever");

            Assert.Null(result);
        }

        [Fact]
        public async Task ValidateLoginAsync_WrongPassword_ReturnsNull()
        {
            var user = new User { Email = "a@b.com", Password = PasswordHelper.Hash("correct-password") };
            _users.Setup(u => u.GetByEmailAsync("a@b.com")).ReturnsAsync(user);
            var service = CreateService();

            var result = await service.ValidateLoginAsync("a@b.com", "wrong-password");

            Assert.Null(result);
        }

        [Fact]
        public async Task ValidateLoginAsync_CorrectPassword_ReturnsUser()
        {
            var user = new User { Email = "a@b.com", Password = PasswordHelper.Hash("correct-password") };
            _users.Setup(u => u.GetByEmailAsync("a@b.com")).ReturnsAsync(user);
            var service = CreateService();

            var result = await service.ValidateLoginAsync("a@b.com", "correct-password");

            Assert.Same(user, result);
        }
    }
}
