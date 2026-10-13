using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using IOM.Api.Resources;
using Xunit;

namespace IOM.Tests.Integration
{
    [Collection(IntegrationCollection.Name)]
    public class SuppliersApiControllerTests
    {
        private readonly IomWebApplicationFactory _factory;

        public SuppliersApiControllerTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task Create_GetById_Update_Delete_RoundTrip()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var name = $"Supplier {Guid.NewGuid()}";

            var create = await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = name });
            Assert.Equal(HttpStatusCode.Created, create.StatusCode);
            var created = await create.Content.ReadFromJsonAsync<SupplierResource>();
            Assert.Equal(name, created.Name);

            var fetched = await admin.GetFromJsonAsync<SupplierResource>($"api/suppliers/{created.Id}");
            Assert.Equal(name, fetched.Name);

            var update = await admin.PutAsJsonAsync($"api/suppliers/{created.Id}", new SaveSupplierResource { Name = name + " (renamed)" });
            Assert.Equal(HttpStatusCode.NoContent, update.StatusCode);
            Assert.Equal(name + " (renamed)", (await admin.GetFromJsonAsync<SupplierResource>($"api/suppliers/{created.Id}")).Name);

            Assert.Equal(HttpStatusCode.NoContent, (await admin.DeleteAsync($"api/suppliers/{created.Id}")).StatusCode);
            Assert.Equal(HttpStatusCode.NotFound, (await admin.GetAsync($"api/suppliers/{created.Id}")).StatusCode);
        }

        [Fact]
        public async Task GetAll_IncludesNewSupplier()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var name = $"Listed Supplier {Guid.NewGuid()}";
            (await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = name })).EnsureSuccessStatusCode();

            var all = await admin.GetFromJsonAsync<SupplierResource[]>("api/suppliers");

            Assert.Contains(all, s => s.Name == name);
        }

        [Fact]
        public async Task Search_FindsSupplierByPartialName()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var token = Guid.NewGuid().ToString("N")[..10];
            (await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"Zeta {token} Foods" })).EnsureSuccessStatusCode();

            var results = await admin.GetFromJsonAsync<SupplierResource[]>($"api/suppliers/search?query={token}");

            Assert.Contains(results, s => s.Name == $"Zeta {token} Foods");
        }

        [Fact]
        public async Task Create_MissingName_Returns400()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = "" });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task UpdateOrDelete_UnknownSupplier_Returns404()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            Assert.Equal(HttpStatusCode.NotFound,
                (await admin.PutAsJsonAsync($"api/suppliers/{Guid.NewGuid()}", new SaveSupplierResource { Name = "X" })).StatusCode);
            Assert.Equal(HttpStatusCode.NotFound, (await admin.DeleteAsync($"api/suppliers/{Guid.NewGuid()}")).StatusCode);
        }

        [Fact]
        public async Task Clients_CannotSeeOrChangeSuppliers()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var created = await (await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"Hidden {Guid.NewGuid()}" }))
                .Content.ReadFromJsonAsync<SupplierResource>();
            var client = await AuthHelper.CreateClientUserAsync(_factory);

            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync("api/suppliers")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync($"api/suppliers/{created.Id}")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync("api/suppliers/search?query=Hidden")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = "Nope" })).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.DeleteAsync($"api/suppliers/{created.Id}")).StatusCode);
        }

        [Fact]
        public async Task Anonymous_Returns401()
        {
            Assert.Equal(HttpStatusCode.Unauthorized, (await _factory.CreateClient().GetAsync("api/suppliers")).StatusCode);
        }
    }
}
