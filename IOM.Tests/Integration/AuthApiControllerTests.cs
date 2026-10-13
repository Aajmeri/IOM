using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using IOM.Api.Controllers.Api;
using Xunit;

namespace IOM.Tests.Integration
{
    [Collection(IntegrationCollection.Name)]
    public class AuthApiControllerTests
    {
        private readonly IomWebApplicationFactory _factory;

        public AuthApiControllerTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private static RegisterRequest Registration(string email = null, string password = "Client123!", string confirm = null) => new()
        {
            Name = "New Client",
            Email = email ?? $"auth-{Guid.NewGuid():N}@example.com",
            Password = password,
            ConfirmPassword = confirm ?? password
        };

        [Fact]
        public async Task Login_SeededAdmin_ReturnsTokenAndAdminRole()
        {
            var response = await _factory.CreateClient().PostAsJsonAsync("api/auth/login", new LoginRequest
            {
                Email = AuthHelper.AdminEmail,
                Password = AuthHelper.AdminPassword
            });

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var auth = await response.Content.ReadFromJsonAsync<AuthResponse>();
            Assert.False(string.IsNullOrEmpty(auth.Token));
            Assert.Equal("Admin", auth.Role);
            Assert.Equal(AuthHelper.AdminEmail, auth.Email);
        }

        [Fact]
        public async Task Login_WrongPassword_Returns401()
        {
            var response = await _factory.CreateClient().PostAsJsonAsync("api/auth/login", new LoginRequest
            {
                Email = AuthHelper.AdminEmail,
                Password = "wrong-password"
            });

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task Login_UnknownEmail_Returns401()
        {
            var response = await _factory.CreateClient().PostAsJsonAsync("api/auth/login", new LoginRequest
            {
                Email = $"nobody-{Guid.NewGuid():N}@example.com",
                Password = "whatever"
            });

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task Register_NewUser_IsAClientAndCanLogIn()
        {
            var registration = Registration();

            var response = await _factory.CreateClient().PostAsJsonAsync("api/auth/register", registration);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var auth = await response.Content.ReadFromJsonAsync<AuthResponse>();
            Assert.Equal("Client", auth.Role);
            Assert.False(string.IsNullOrEmpty(auth.Token));

            var login = await _factory.CreateClient().PostAsJsonAsync("api/auth/login", new LoginRequest
            {
                Email = registration.Email,
                Password = registration.Password
            });
            Assert.Equal(HttpStatusCode.OK, login.StatusCode);
        }

        [Fact]
        public async Task Register_DuplicateEmail_Returns400()
        {
            var registration = Registration();
            (await _factory.CreateClient().PostAsJsonAsync("api/auth/register", registration)).EnsureSuccessStatusCode();

            var again = await _factory.CreateClient().PostAsJsonAsync("api/auth/register", registration);

            Assert.Equal(HttpStatusCode.BadRequest, again.StatusCode);
            Assert.Contains("already exists", await again.Content.ReadAsStringAsync());
        }

        [Fact]
        public async Task Register_PasswordMismatch_Returns400()
        {
            var response = await _factory.CreateClient().PostAsJsonAsync("api/auth/register", Registration(confirm: "Different123!"));

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Theory]
        [InlineData("")]
        [InlineData("not-an-email")]
        public async Task Register_MissingOrInvalidEmail_Returns400(string email)
        {
            var registration = Registration();
            registration.Email = email;

            var response = await _factory.CreateClient().PostAsJsonAsync("api/auth/register", registration);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Register_MissingPassword_Returns400()
        {
            var response = await _factory.CreateClient().PostAsJsonAsync("api/auth/register", Registration(password: "", confirm: ""));

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Login_DeactivatedUser_Returns401()
        {
            var registration = Registration();
            (await _factory.CreateClient().PostAsJsonAsync("api/auth/register", registration)).EnsureSuccessStatusCode();
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var users = await admin.GetFromJsonAsync<UserSummary[]>("api/users");
            var user = Array.Find(users, u => u.Email == registration.Email);

            (await admin.PutAsJsonAsync($"api/users/{user.Id}", new UpdateUserRequest { Name = user.Name, Role = "Client", Active = false }))
                .EnsureSuccessStatusCode();

            var login = await _factory.CreateClient().PostAsJsonAsync("api/auth/login", new LoginRequest
            {
                Email = registration.Email,
                Password = registration.Password
            });
            Assert.Equal(HttpStatusCode.Unauthorized, login.StatusCode);
        }

        [Fact]
        public async Task ProtectedEndpoint_NoToken_Returns401()
        {
            var response = await _factory.CreateClient().GetAsync("api/products");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task ProtectedEndpoint_TamperedToken_Returns401()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var token = admin.DefaultRequestHeaders.Authorization.Parameter;
            var client = _factory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token[..^4] + "AAAA");

            var response = await client.GetAsync("api/products");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task ClientToken_CannotReachStaffOnlyEndpoints()
        {
            var client = await AuthHelper.CreateClientUserAsync(_factory);

            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync("api/suppliers")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync("api/deliveries/search")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync("api/orders")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync("api/users")).StatusCode);
        }

        [Fact]
        public async Task UnknownApiRoute_Returns404_NotTheSpaPage()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.GetAsync("api/does-not-exist");

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            Assert.DoesNotContain("<app-root", await response.Content.ReadAsStringAsync());
        }

        [Fact]
        public async Task SpaDeepLink_StillServesTheAngularApp()
        {
            var response = await _factory.CreateClient().GetAsync("shop/orders");

            // wwwroot/index.html is the built SPA; deep links must fall back to it for client-side routing.
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Contains("<app-root", await response.Content.ReadAsStringAsync());
        }

        private class UserSummary
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
        }
    }
}
