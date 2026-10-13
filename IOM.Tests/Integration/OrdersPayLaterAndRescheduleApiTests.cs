using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;
using IOM.Api.Controllers.Api;
using IOM.Api.Resources;
using IOM.Service.Services;
using Xunit;

namespace IOM.Tests.Integration
{
    [Collection(IntegrationCollection.Name)]
    public class OrdersPayLaterAndRescheduleApiTests
    {
        private readonly IomWebApplicationFactory _factory;

        // Own slot range (days 18+) so these never compete for capacity with OrdersCheckoutApiTests.
        private static int _slotCounter;

        public OrdersPayLaterAndRescheduleApiTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private static DateTime NextSlot()
        {
            var n = Interlocked.Increment(ref _slotCounter);
            return DateTime.Now.Date.AddDays(18 + n / 5).AddHours(8 + 2 * (n % 5));
        }

        private static PaymentCardResource Card(string number = "4242 4242 4242 4242") => new()
        {
            CardholderName = "Test Client",
            CardNumber = number,
            ExpiryMonth = 12,
            ExpiryYear = DateTime.UtcNow.Year + 2,
            Cvc = "123"
        };

        private async Task<Guid> CreateProductAsync(decimal price)
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplierResponse = await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"PayLater Supplier {Guid.NewGuid()}" });
            supplierResponse.EnsureSuccessStatusCode();
            var supplier = await supplierResponse.Content.ReadFromJsonAsync<SupplierResource>();

            var productResponse = await admin.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "PayLater Widget",
                Price = price,
                Quantity = 100,
                Visibility = true,
                SupplierId = supplier.Id
            });
            productResponse.EnsureSuccessStatusCode();
            return (await productResponse.Content.ReadFromJsonAsync<ProductResource>()).Id;
        }

        private static CheckoutResource PayLaterCheckout(Guid productId, int quantity = 2) => new()
        {
            ScheduledDate = NextSlot(),
            Items = new List<SaveOrderItemResource> { new() { ProductId = productId, Quantity = quantity } },
            PayLater = true
        };

        private async Task<(HttpClient client, OrderResource order)> PlaceUnpaidOrderAsync(decimal price = 5m, int quantity = 2)
        {
            var productId = await CreateProductAsync(price);
            var client = await AuthHelper.CreateClientUserAsync(_factory);
            var response = await client.PostAsJsonAsync("api/orders", PayLaterCheckout(productId, quantity));
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            return (client, await response.Content.ReadFromJsonAsync<OrderResource>());
        }

        // ---- Pay later -------------------------------------------------------------------

        [Fact]
        public async Task Checkout_PayLater_CreatesPendingUnpaidOrderWithNoReceipt()
        {
            var (client, order) = await PlaceUnpaidOrderAsync(price: 5m, quantity: 2);

            Assert.Equal("Pending", order.Status);
            Assert.Equal("Unpaid", order.PaymentStatus);
            Assert.Equal(10m, order.Total);

            var receipt = await client.GetAsync($"api/orders/{order.Id}/receipt");
            Assert.Equal(HttpStatusCode.NotFound, receipt.StatusCode);

            var mine = await client.GetFromJsonAsync<OrderResource[]>("api/orders/mine");
            Assert.Contains(mine, o => o.Id == order.Id && o.PaymentStatus == "Unpaid");
        }

        [Fact]
        public async Task Checkout_PayLater_IgnoresAnyCardSentAlongAndNeverCharges()
        {
            var productId = await CreateProductAsync(5m);
            var client = await AuthHelper.CreateClientUserAsync(_factory);
            var checkout = PayLaterCheckout(productId);
            checkout.Payment = Card("not a card");

            var response = await client.PostAsJsonAsync("api/orders", checkout);

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.Equal("Unpaid", (await response.Content.ReadFromJsonAsync<OrderResource>()).PaymentStatus);
        }

        [Fact]
        public async Task Pay_UnpaidOrder_ByOwner_ReturnsEmailedReceiptAndCannotPayTwice()
        {
            var (client, order) = await PlaceUnpaidOrderAsync(price: 7.5m, quantity: 2);

            var response = await client.PostAsJsonAsync($"api/orders/{order.Id}/pay", Card());

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var receipt = await response.Content.ReadFromJsonAsync<ReceiptResource>();
            Assert.Equal(order.Id, receipt.OrderId);
            Assert.Equal("Paid", receipt.PaymentStatus);
            Assert.Equal(15m, receipt.AmountPaid);
            Assert.Equal("4242", receipt.CardLast4);
            Assert.Equal(receipt.ClientEmail, receipt.EmailedTo);

            Assert.Equal(HttpStatusCode.OK, (await client.GetAsync($"api/orders/{order.Id}/receipt")).StatusCode);

            var again = await client.PostAsJsonAsync($"api/orders/{order.Id}/pay", Card());
            Assert.Equal(HttpStatusCode.BadRequest, again.StatusCode);
            Assert.Contains("already been paid", await again.Content.ReadAsStringAsync());
        }

        [Fact]
        public async Task Pay_DeclinedCard_Returns400AndOrderStaysUnpaid()
        {
            var (client, order) = await PlaceUnpaidOrderAsync();

            var response = await client.PostAsJsonAsync($"api/orders/{order.Id}/pay", Card(SimulatedPaymentService.DeclinedCard));

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            Assert.Contains("declined", await response.Content.ReadAsStringAsync());
            var reloaded = await client.GetFromJsonAsync<OrderResource>($"api/orders/{order.Id}");
            Assert.Equal("Unpaid", reloaded.PaymentStatus);
        }

        [Fact]
        public async Task Pay_InvalidCard_FailsValidation()
        {
            var (client, order) = await PlaceUnpaidOrderAsync();

            var response = await client.PostAsJsonAsync($"api/orders/{order.Id}/pay", Card("4242 4242 4242 4241"));

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Pay_SomeoneElsesOrder_IsForbidden_AndStaffCannotPay()
        {
            var (_, order) = await PlaceUnpaidOrderAsync();

            var stranger = await AuthHelper.CreateClientUserAsync(_factory);
            Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsJsonAsync($"api/orders/{order.Id}/pay", Card())).StatusCode);

            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            Assert.Equal(HttpStatusCode.Forbidden, (await admin.PostAsJsonAsync($"api/orders/{order.Id}/pay", Card())).StatusCode);
        }

        [Fact]
        public async Task Pay_CancelledOrder_Returns400()
        {
            var (client, order) = await PlaceUnpaidOrderAsync();
            Assert.Equal(HttpStatusCode.NoContent, (await client.DeleteAsync($"api/orders/{order.Id}")).StatusCode);

            var response = await client.PostAsJsonAsync($"api/orders/{order.Id}/pay", Card());

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Accept_UnpaidOrder_IsAllowedAndStaysUnpaid()
        {
            var (_, order) = await PlaceUnpaidOrderAsync();
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PostAsJsonAsync($"api/orders/{order.Id}/approve", new AdminNotesRequest());

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var approved = await response.Content.ReadFromJsonAsync<OrderResource>();
            Assert.Equal("Approved", approved.Status);
            Assert.Equal("Unpaid", approved.PaymentStatus);
        }

        // ---- Reschedule ------------------------------------------------------------------

        [Fact]
        public async Task Reschedule_AsStaff_MovesOrderAndKeepsStatus()
        {
            var (client, order) = await PlaceUnpaidOrderAsync();
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var newSlot = NextSlot();

            var response = await admin.PostAsJsonAsync($"api/orders/{order.Id}/reschedule", new RescheduleOrderResource
            {
                ScheduledDate = newSlot,
                Reason = "Truck unavailable"
            });

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var rescheduled = await response.Content.ReadFromJsonAsync<OrderResource>();
            Assert.Equal(newSlot, rescheduled.ScheduledDate);
            Assert.Equal("Pending", rescheduled.Status);
            Assert.Equal("Truck unavailable", rescheduled.AdminNotes);

            var seenByClient = await client.GetFromJsonAsync<OrderResource>($"api/orders/{order.Id}");
            Assert.Equal(newSlot, seenByClient.ScheduledDate);
        }

        [Fact]
        public async Task Reschedule_ApprovedOrder_StaysApproved()
        {
            var (_, order) = await PlaceUnpaidOrderAsync();
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            (await admin.PostAsJsonAsync($"api/orders/{order.Id}/approve", new AdminNotesRequest())).EnsureSuccessStatusCode();

            var response = await admin.PostAsJsonAsync($"api/orders/{order.Id}/reschedule", new RescheduleOrderResource { ScheduledDate = NextSlot() });

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Approved", (await response.Content.ReadFromJsonAsync<OrderResource>()).Status);
        }

        [Fact]
        public async Task Reschedule_AsClient_IsForbidden()
        {
            var (client, order) = await PlaceUnpaidOrderAsync();

            var response = await client.PostAsJsonAsync($"api/orders/{order.Id}/reschedule", new RescheduleOrderResource { ScheduledDate = NextSlot() });

            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task Reschedule_InvalidSlot_Returns400()
        {
            var (_, order) = await PlaceUnpaidOrderAsync();
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PostAsJsonAsync($"api/orders/{order.Id}/reschedule", new RescheduleOrderResource
            {
                ScheduledDate = NextSlot().AddMinutes(30)
            });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            Assert.Contains("not a valid delivery slot", await response.Content.ReadAsStringAsync());
        }

        [Fact]
        public async Task Reschedule_MissingDate_FailsValidation()
        {
            var (_, order) = await PlaceUnpaidOrderAsync();
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PostAsJsonAsync($"api/orders/{order.Id}/reschedule", new RescheduleOrderResource());

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Reschedule_UnknownOrder_Returns404()
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PostAsJsonAsync($"api/orders/{Guid.NewGuid()}/reschedule", new RescheduleOrderResource { ScheduledDate = NextSlot() });

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
