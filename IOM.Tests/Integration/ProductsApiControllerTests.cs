using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using IOM.Api.Resources;
using Xunit;

namespace IOM.Tests.Integration
{
    [Collection(IntegrationCollection.Name)]
    public class ProductsApiControllerTests
    {
        private readonly IomWebApplicationFactory _factory;

        public ProductsApiControllerTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private async Task<(HttpClient client, Guid supplierId)> CreateClientWithSupplierAsync()
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplierResponse = await client.PostAsJsonAsync("api/suppliers", new SaveSupplierResource
            {
                Name = $"Supplier {Guid.NewGuid()}"
            });
            supplierResponse.EnsureSuccessStatusCode();
            var supplier = await supplierResponse.Content.ReadFromJsonAsync<SupplierResource>();
            return (client, supplier.Id);
        }

        [Fact]
        public async Task GetAll_WithoutAuth_ReturnsUnauthorized()
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync("api/products");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task Create_ThenGetById_RoundTrips()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var barcode = $"BC-{Guid.NewGuid():N}";

            var createResponse = await client.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "Test Widget",
                Description = "A widget for testing",
                Price = 12.34m,
                Quantity = 10,
                Visibility = true,
                Barcode = barcode,
                SupplierId = supplierId
            });

            Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);
            var created = await createResponse.Content.ReadFromJsonAsync<ProductResource>();
            Assert.Equal(barcode, created.Barcode);
            Assert.Equal(supplierId, created.SupplierId);

            var getResponse = await client.GetAsync($"api/products/{created.Id}");
            Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
            var fetched = await getResponse.Content.ReadFromJsonAsync<ProductResource>();
            Assert.Equal("Test Widget", fetched.Name);
            Assert.Equal(barcode, fetched.Barcode);
        }

        [Fact]
        public async Task Create_WithDuplicateBarcode_ReturnsBadRequest()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var barcode = $"DUP-{Guid.NewGuid():N}";

            var first = await client.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "First",
                Price = 1,
                Barcode = barcode,
                SupplierId = supplierId
            });
            Assert.Equal(HttpStatusCode.Created, first.StatusCode);

            var second = await client.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "Second",
                Price = 2,
                Barcode = barcode,
                SupplierId = supplierId
            });

            Assert.Equal(HttpStatusCode.BadRequest, second.StatusCode);
        }

        [Fact]
        public async Task Create_WithoutSupplierId_ReturnsBadRequestFromValidator()
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await client.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "No Supplier",
                Price = 1,
                SupplierId = Guid.Empty
            });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task GetByBarcode_Found_ReturnsProduct()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var barcode = $"SCAN-{Guid.NewGuid():N}";
            var createResponse = await client.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "Scannable",
                Price = 5,
                Barcode = barcode,
                SupplierId = supplierId
            });
            createResponse.EnsureSuccessStatusCode();

            var response = await client.GetAsync($"api/products/by-barcode/{barcode}");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var product = await response.Content.ReadFromJsonAsync<ProductResource>();
            Assert.Equal(barcode, product.Barcode);
        }

        [Fact]
        public async Task GetByBarcode_NotFound_Returns404()
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await client.GetAsync($"api/products/by-barcode/does-not-exist-{Guid.NewGuid():N}");

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task GetById_Missing_Returns404()
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await client.GetAsync($"api/products/{Guid.NewGuid()}");

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task Update_SwappingSupplier_ReplacesSupplierLinkInsteadOfDuplicating()
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var supplier1Response = await client.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"Supplier1-{Guid.NewGuid()}" });
            var supplier1 = await supplier1Response.Content.ReadFromJsonAsync<SupplierResource>();
            var supplier2Response = await client.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"Supplier2-{Guid.NewGuid()}" });
            var supplier2 = await supplier2Response.Content.ReadFromJsonAsync<SupplierResource>();

            var createResponse = await client.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "Swap Supplier Product",
                Price = 1,
                Barcode = $"SWAP-{Guid.NewGuid():N}",
                SupplierId = supplier1.Id
            });
            var created = await createResponse.Content.ReadFromJsonAsync<ProductResource>();
            Assert.Equal(supplier1.Id, created.SupplierId);

            var updateResponse = await client.PutAsJsonAsync($"api/products/{created.Id}", new SaveProductResource
            {
                Name = created.Name,
                Price = created.Price,
                Barcode = created.Barcode,
                SupplierId = supplier2.Id
            });
            Assert.Equal(HttpStatusCode.NoContent, updateResponse.StatusCode);

            var getResponse = await client.GetAsync($"api/products/{created.Id}");
            var updated = await getResponse.Content.ReadFromJsonAsync<ProductResource>();
            Assert.Equal(supplier2.Id, updated.SupplierId);
            Assert.Equal(supplier2.Name, updated.SupplierName);
        }

        [Fact]
        public async Task Update_SameProductAgain_DoesNotThrowDuplicateKeyError()
        {
            // Regression coverage for the tracked-SupplierProduct-collection bug: updating a
            // product twice in a row with the SAME supplier used to throw on the second update.
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var createResponse = await client.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "Repeat Update",
                Price = 1,
                Barcode = $"REPEAT-{Guid.NewGuid():N}",
                SupplierId = supplierId
            });
            var created = await createResponse.Content.ReadFromJsonAsync<ProductResource>();

            var update1 = await client.PutAsJsonAsync($"api/products/{created.Id}", new SaveProductResource
            {
                Name = "Repeat Update v2",
                Price = 2,
                Barcode = created.Barcode,
                SupplierId = supplierId
            });
            var update2 = await client.PutAsJsonAsync($"api/products/{created.Id}", new SaveProductResource
            {
                Name = "Repeat Update v3",
                Price = 3,
                Barcode = created.Barcode,
                SupplierId = supplierId
            });

            Assert.Equal(HttpStatusCode.NoContent, update1.StatusCode);
            Assert.Equal(HttpStatusCode.NoContent, update2.StatusCode);
        }

        [Fact]
        public async Task Delete_RemovesProduct()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var createResponse = await client.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "To Delete",
                Price = 1,
                Barcode = $"DEL-{Guid.NewGuid():N}",
                SupplierId = supplierId
            });
            var created = await createResponse.Content.ReadFromJsonAsync<ProductResource>();

            var deleteResponse = await client.DeleteAsync($"api/products/{created.Id}");
            Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

            var getResponse = await client.GetAsync($"api/products/{created.Id}");
            Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
        }
    }
}
