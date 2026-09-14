using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;

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

        public static async Task<HttpClient> CreateAuthenticatedClientAsync(IomWebApplicationFactory factory)
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
    }
}
