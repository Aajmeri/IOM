using System;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using IOM.Api.Controllers.Api;
using Xunit;

namespace IOM.Tests.Integration
{
    [Collection(IntegrationCollection.Name)]
    public class UsersApiControllerTests
    {
        private readonly IomWebApplicationFactory _factory;

        public UsersApiControllerTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private class UserSummary
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Role { get; set; }
            public bool Active { get; set; }
        }

        private async Task<UserSummary> RegisteredUserAsync(string email)
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var users = await admin.GetFromJsonAsync<UserSummary[]>("api/users");
            return Array.Find(users, u => u.Email == email);
        }

        [Fact]
        public async Task GetAll_AsAdmin_ListsUsersWithoutPasswordHashes()
        {
            var (_, email) = await AuthHelper.RegisterClientAsync(_factory);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.GetAsync("api/users");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var json = await response.Content.ReadAsStringAsync();
            Assert.Contains(email, json);
            using var doc = JsonDocument.Parse(json);
            foreach (var user in doc.RootElement.EnumerateArray())
            {
                Assert.False(user.TryGetProperty("password", out _), "GET api/users must never return password hashes.");
            }
        }

        [Fact]
        public async Task GetById_AsAdmin_ReturnsUserWithoutPasswordHash()
        {
            var (_, email) = await AuthHelper.RegisterClientAsync(_factory);
            var user = await RegisteredUserAsync(email);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.GetAsync($"api/users/{user.Id}");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            Assert.Equal(email, doc.RootElement.GetProperty("email").GetString());
            Assert.Equal("Client", doc.RootElement.GetProperty("role").GetString());
            Assert.False(doc.RootElement.TryGetProperty("password", out _));
        }

        [Fact]
        public async Task Users_AreAdminOnly()
        {
            var client = await AuthHelper.CreateClientUserAsync(_factory);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync("api/users")).StatusCode);

            // Promote a fresh user to Warehouse: staff, but still not an admin.
            var (_, email) = await AuthHelper.RegisterClientAsync(_factory);
            var user = await RegisteredUserAsync(email);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            (await admin.PutAsJsonAsync($"api/users/{user.Id}", new UpdateUserRequest { Name = user.Name, Role = "Warehouse", Active = true }))
                .EnsureSuccessStatusCode();
            var warehouse = await AuthHelper.LoginAsync(_factory, email, "Client123!");

            Assert.Equal(HttpStatusCode.Forbidden, (await warehouse.GetAsync("api/users")).StatusCode);
        }

        [Fact]
        public async Task Update_ChangesNameAndRole_AndTheNewRoleAppliesAtNextLogin()
        {
            var (_, email) = await AuthHelper.RegisterClientAsync(_factory);
            var user = await RegisteredUserAsync(email);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var update = await admin.PutAsJsonAsync($"api/users/{user.Id}", new UpdateUserRequest { Name = "Renamed", Role = "Warehouse", Active = true });

            Assert.Equal(HttpStatusCode.NoContent, update.StatusCode);
            var updated = await admin.GetFromJsonAsync<UserSummary>($"api/users/{user.Id}");
            Assert.Equal("Renamed", updated.Name);
            Assert.Equal("Warehouse", updated.Role);

            // Staff-only endpoint now reachable with a fresh token.
            var warehouse = await AuthHelper.LoginAsync(_factory, email, "Client123!");
            Assert.Equal(HttpStatusCode.OK, (await warehouse.GetAsync("api/suppliers")).StatusCode);
        }

        [Theory]
        [InlineData("SuperUser")]
        [InlineData("")]
        public async Task Update_UnknownRole_Returns400(string role)
        {
            var (_, email) = await AuthHelper.RegisterClientAsync(_factory);
            var user = await RegisteredUserAsync(email);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PutAsJsonAsync($"api/users/{user.Id}", new UpdateUserRequest { Name = user.Name, Role = role, Active = true });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            Assert.Equal("Client", (await admin.GetFromJsonAsync<UserSummary>($"api/users/{user.Id}")).Role);
        }

        [Fact]
        public async Task Update_UnknownUser_Returns404()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PutAsJsonAsync($"api/users/{Guid.NewGuid()}", new UpdateUserRequest { Name = "X", Role = "Client", Active = true });

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task Delete_RemovesTheUser()
        {
            var (_, email) = await AuthHelper.RegisterClientAsync(_factory);
            var user = await RegisteredUserAsync(email);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            Assert.Equal(HttpStatusCode.NoContent, (await admin.DeleteAsync($"api/users/{user.Id}")).StatusCode);

            Assert.Equal(HttpStatusCode.NotFound, (await admin.GetAsync($"api/users/{user.Id}")).StatusCode);
            Assert.Equal(HttpStatusCode.NotFound, (await admin.DeleteAsync($"api/users/{user.Id}")).StatusCode);
        }
    }
}
