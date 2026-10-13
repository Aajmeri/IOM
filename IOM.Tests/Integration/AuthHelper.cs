using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;

namespace IOM.Tests.Integration
{
    public static class AuthHelper
    {
        public const string AdminEmail = "admin@admin.com";
        public const string AdminPassword = "Admin123!";

        private class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        private class AuthResponse
        {
            public string Token { get; set; }
        }

        public static async Task<HttpClient> CreateAuthenticatedClientAsync(WebApplicationFactory<Program> factory)
        {
            var client = factory.CreateClient();
            var response = await client.PostAsJsonAsync("api/auth/login", new LoginRequest
            {
                Email = AdminEmail,
                Password = AdminPassword
            });
            response.EnsureSuccessStatusCode();
            var auth = await response.Content.ReadFromJsonAsync<AuthResponse>();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.Token);
            return client;
        }

        private class RegisterRequest
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string ConfirmPassword { get; set; }
        }

        /// <summary>Self-registers a brand-new user (who gets the Client role) and returns a client authenticated as them.</summary>
        public static async Task<HttpClient> CreateClientUserAsync(WebApplicationFactory<Program> factory)
            => (await RegisterClientAsync(factory)).Client;

        /// <summary>Like <see cref="CreateClientUserAsync"/>, but also returns the new user's (unique) email address.</summary>
        public static async Task<(HttpClient Client, string Email)> RegisterClientAsync(WebApplicationFactory<Program> factory)
        {
            var client = factory.CreateClient();
            var email = $"client-{System.Guid.NewGuid():N}@example.com";
            var response = await client.PostAsJsonAsync("api/auth/register", new RegisterRequest
            {
                Name = "Test Client",
                Email = email,
                Password = "Client123!",
                ConfirmPassword = "Client123!"
            });
            response.EnsureSuccessStatusCode();
            var auth = await response.Content.ReadFromJsonAsync<AuthResponse>();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.Token);
            return (client, email);
        }

        /// <summary>Logs in as an existing user and returns an authenticated client.</summary>
        public static async Task<HttpClient> LoginAsync(WebApplicationFactory<Program> factory, string email, string password)
        {
            var client = factory.CreateClient();
            var response = await client.PostAsJsonAsync("api/auth/login", new LoginRequest { Email = email, Password = password });
            response.EnsureSuccessStatusCode();
            var auth = await response.Content.ReadFromJsonAsync<AuthResponse>();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.Token);
            return client;
        }
    }
}
