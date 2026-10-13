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
    public class ItemsApiControllerTests
    {
        private readonly IomWebApplicationFactory _factory;

        public ItemsApiControllerTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private async Task<(HttpClient admin, Guid productId)> AdminWithProductAsync()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplier = await (await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"Item Supplier {Guid.NewGuid()}" }))
                .Content.ReadFromJsonAsync<SupplierResource>();
            var productResponse = await admin.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "Item Product",
                Price = 3m,
                Quantity = 0,
                Visibility = true,
                SupplierId = supplier.Id
            });
            productResponse.EnsureSuccessStatusCode();
            return (admin, (await productResponse.Content.ReadFromJsonAsync<ProductResource>()).Id);
        }

        [Fact]
        public async Task Create_ThenListByProduct_IncludesBatchWithExpiration()
        {
            var (admin, productId) = await AdminWithProductAsync();
            var expires = new DateTime(2027, 3, 31);

            var create = await admin.PostAsJsonAsync("api/items", new SaveItemResource { ProductId = productId, Quantity = 24, ExpirationDate = expires });

            Assert.Equal(HttpStatusCode.Created, create.StatusCode);
            var created = await create.Content.ReadFromJsonAsync<ItemResource>();
            Assert.Equal(productId, created.ProductId);
            Assert.Equal("Item Product", created.ProductName);
            Assert.Equal(24, created.Quantity);
            Assert.Equal(expires, created.ExpirationDate);

            var forProduct = await admin.GetFromJsonAsync<ItemResource[]>($"api/items/by-product/{productId}");
            Assert.Contains(forProduct, i => i.Id == created.Id && i.Quantity == 24);
        }

        [Fact]
        public async Task SeparateBatchesOfTheSameProduct_KeepTheirOwnExpirationDates()
        {
            var (admin, productId) = await AdminWithProductAsync();
            (await admin.PostAsJsonAsync("api/items", new SaveItemResource { ProductId = productId, Quantity = 5, ExpirationDate = new DateTime(2027, 1, 1) })).EnsureSuccessStatusCode();
            (await admin.PostAsJsonAsync("api/items", new SaveItemResource { ProductId = productId, Quantity = 7, ExpirationDate = new DateTime(2027, 6, 1) })).EnsureSuccessStatusCode();

            var batches = await admin.GetFromJsonAsync<ItemResource[]>($"api/items/by-product/{productId}");

            Assert.Equal(2, batches.Length);
            Assert.Contains(batches, b => b.Quantity == 5 && b.ExpirationDate == new DateTime(2027, 1, 1));
            Assert.Contains(batches, b => b.Quantity == 7 && b.ExpirationDate == new DateTime(2027, 6, 1));
        }

        [Fact]
        public async Task Update_ThenDelete()
        {
            var (admin, productId) = await AdminWithProductAsync();
            var created = await (await admin.PostAsJsonAsync("api/items", new SaveItemResource { ProductId = productId, Quantity = 10 }))
                .Content.ReadFromJsonAsync<ItemResource>();

            var update = await admin.PutAsJsonAsync($"api/items/{created.Id}", new SaveItemResource { ProductId = productId, Quantity = 4 });
            Assert.Equal(HttpStatusCode.NoContent, update.StatusCode);
            Assert.Equal(4, (await admin.GetFromJsonAsync<ItemResource>($"api/items/{created.Id}")).Quantity);

            Assert.Equal(HttpStatusCode.NoContent, (await admin.DeleteAsync($"api/items/{created.Id}")).StatusCode);
            Assert.Equal(HttpStatusCode.NotFound, (await admin.GetAsync($"api/items/{created.Id}")).StatusCode);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-3)]
        public async Task Create_NonPositiveQuantity_Returns400(int quantity)
        {
            var (admin, productId) = await AdminWithProductAsync();

            var response = await admin.PostAsJsonAsync("api/items", new SaveItemResource { ProductId = productId, Quantity = quantity });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Create_MissingProduct_Returns400()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PostAsJsonAsync("api/items", new SaveItemResource { ProductId = Guid.Empty, Quantity = 1 });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task UnknownItem_Returns404()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            Assert.Equal(HttpStatusCode.NotFound, (await admin.GetAsync($"api/items/{Guid.NewGuid()}")).StatusCode);
            Assert.Equal(HttpStatusCode.NotFound, (await admin.DeleteAsync($"api/items/{Guid.NewGuid()}")).StatusCode);
        }

        [Fact]
        public async Task Clients_CannotSeeItems()
        {
            var (admin, productId) = await AdminWithProductAsync();
            var created = await (await admin.PostAsJsonAsync("api/items", new SaveItemResource { ProductId = productId, Quantity = 1 }))
                .Content.ReadFromJsonAsync<ItemResource>();
            var client = await AuthHelper.CreateClientUserAsync(_factory);

            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync($"api/items/{created.Id}")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync($"api/items/by-product/{productId}")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await client.PostAsJsonAsync("api/items", new SaveItemResource { ProductId = productId, Quantity = 1 })).StatusCode);
        }
    }
}
