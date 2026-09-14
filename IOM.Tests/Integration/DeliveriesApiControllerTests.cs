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
    public class DeliveriesApiControllerTests
    {
        private readonly IomWebApplicationFactory _factory;

        public DeliveriesApiControllerTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private async Task<(HttpClient client, Guid supplierId)> CreateClientWithSupplierAsync(string namePrefix)
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplierResponse = await client.PostAsJsonAsync("api/suppliers", new SaveSupplierResource
            {
                Name = $"{namePrefix} {Guid.NewGuid()}"
            });
            supplierResponse.EnsureSuccessStatusCode();
            var supplier = await supplierResponse.Content.ReadFromJsonAsync<SupplierResource>();
            return (client, supplier.Id);
        }

        [Fact]
        public async Task Create_ThenGetById_RoundTrips()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync("DeliverySupplier");
            var scheduledDate = new DateTime(2026, 6, 15, 0, 0, 0, DateTimeKind.Utc);

            var createResponse = await client.PostAsJsonAsync("api/deliveries", new SaveDeliveryResource
            {
                SupplierId = supplierId,
                ScheduledDate = scheduledDate,
                Status = "Scheduled",
                Notes = "First delivery"
            });

            Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);
            var created = await createResponse.Content.ReadFromJsonAsync<DeliveryResource>();
            Assert.Equal(supplierId, created.SupplierId);
            Assert.Equal("Scheduled", created.Status);

            var getResponse = await client.GetAsync($"api/deliveries/{created.Id}");
            Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
        }

        [Fact]
        public async Task Search_BySupplierId_ReturnsOnlyThatSuppliersDeliveries()
        {
            var (client, supplierA) = await CreateClientWithSupplierAsync("SearchSupplierA");
            var (_, supplierB) = await CreateClientWithSupplierAsync("SearchSupplierB");
            var scheduledDate = new DateTime(2026, 7, 1);

            await client.PostAsJsonAsync("api/deliveries", new SaveDeliveryResource
            {
                SupplierId = supplierA,
                ScheduledDate = scheduledDate,
                Status = "Scheduled"
            });
            await client.PostAsJsonAsync("api/deliveries", new SaveDeliveryResource
            {
                SupplierId = supplierB,
                ScheduledDate = scheduledDate,
                Status = "Scheduled"
            });

            var response = await client.GetAsync($"api/deliveries/search?supplierId={supplierA}");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var deliveries = await response.Content.ReadFromJsonAsync<DeliveryResource[]>();
            Assert.NotEmpty(deliveries);
            Assert.All(deliveries, d => Assert.Equal(supplierA, d.SupplierId));
        }

        [Fact]
        public async Task Search_WithInvalidStatus_ReturnsBadRequest()
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await client.GetAsync("api/deliveries/search?status=NotARealStatus");

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Calendar_ReturnsOnlyDeliveriesWithinRange()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync("CalendarSupplier");
            var inRangeDate = new DateTime(2026, 8, 15);
            var outOfRangeDate = new DateTime(2026, 9, 15);

            var inRangeResponse = await client.PostAsJsonAsync("api/deliveries", new SaveDeliveryResource
            {
                SupplierId = supplierId,
                ScheduledDate = inRangeDate,
                Status = "Scheduled"
            });
            var inRangeCreated = await inRangeResponse.Content.ReadFromJsonAsync<DeliveryResource>();

            var outOfRangeResponse = await client.PostAsJsonAsync("api/deliveries", new SaveDeliveryResource
            {
                SupplierId = supplierId,
                ScheduledDate = outOfRangeDate,
                Status = "Scheduled"
            });
            var outOfRangeCreated = await outOfRangeResponse.Content.ReadFromJsonAsync<DeliveryResource>();

            var response = await client.GetAsync("api/deliveries/calendar?start=2026-08-01&end=2026-08-31");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var deliveries = await response.Content.ReadFromJsonAsync<DeliveryResource[]>();
            Assert.Contains(deliveries, d => d.Id == inRangeCreated.Id);
            Assert.DoesNotContain(deliveries, d => d.Id == outOfRangeCreated.Id);
        }

        [Fact]
        public async Task Update_ChangesStatus()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync("UpdateSupplier");
            var createResponse = await client.PostAsJsonAsync("api/deliveries", new SaveDeliveryResource
            {
                SupplierId = supplierId,
                ScheduledDate = new DateTime(2026, 10, 1),
                Status = "Scheduled"
            });
            var created = await createResponse.Content.ReadFromJsonAsync<DeliveryResource>();

            var updateResponse = await client.PutAsJsonAsync($"api/deliveries/{created.Id}", new SaveDeliveryResource
            {
                SupplierId = supplierId,
                ScheduledDate = created.ScheduledDate,
                Status = "Completed",
                Notes = "Arrived"
            });

            Assert.Equal(HttpStatusCode.NoContent, updateResponse.StatusCode);
            var getResponse = await client.GetAsync($"api/deliveries/{created.Id}");
            var updated = await getResponse.Content.ReadFromJsonAsync<DeliveryResource>();
            Assert.Equal("Completed", updated.Status);
            Assert.Equal("Arrived", updated.Notes);
        }

        [Fact]
        public async Task Delete_RemovesDelivery()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync("DeleteSupplier");
            var createResponse = await client.PostAsJsonAsync("api/deliveries", new SaveDeliveryResource
            {
                SupplierId = supplierId,
                ScheduledDate = new DateTime(2026, 11, 1),
                Status = "Scheduled"
            });
            var created = await createResponse.Content.ReadFromJsonAsync<DeliveryResource>();

            var deleteResponse = await client.DeleteAsync($"api/deliveries/{created.Id}");
            Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

            var getResponse = await client.GetAsync($"api/deliveries/{created.Id}");
            Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
        }
    }
}
