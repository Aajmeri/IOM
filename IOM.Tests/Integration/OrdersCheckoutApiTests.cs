using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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
    public class OrdersCheckoutApiTests
    {
        private readonly IomWebApplicationFactory _factory;

        // Each test books its own delivery slot so slot capacity (3 by default) is never the
        // reason a checkout fails.
        private static int _slotCounter;

        public OrdersCheckoutApiTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private static DateTime NextSlot()
        {
            var n = Interlocked.Increment(ref _slotCounter);
            return DateTime.Now.Date.AddDays(10 + n / 5).AddHours(8 + 2 * (n % 5));
        }

        private async Task<HttpClient> CreateClientUserAsync()
        {
            var client = _factory.CreateClient();
            var email = $"client-{Guid.NewGuid():N}@example.com";
            var response = await client.PostAsJsonAsync("api/auth/register", new RegisterRequest
            {
                Name = "Checkout Client",
                Email = email,
                Password = "Client123!",
                ConfirmPassword = "Client123!"
            });
            response.EnsureSuccessStatusCode();
            var auth = await response.Content.ReadFromJsonAsync<AuthResponse>();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.Token);
            return client;
        }

        private async Task<Guid> CreateProductAsync(decimal price)
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplierResponse = await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"Checkout Supplier {Guid.NewGuid()}" });
            supplierResponse.EnsureSuccessStatusCode();
            var supplier = await supplierResponse.Content.ReadFromJsonAsync<SupplierResource>();

            var productResponse = await admin.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "Checkout Widget",
                Price = price,
                Quantity = 100,
                Visibility = true,
                SupplierId = supplier.Id
            });
            productResponse.EnsureSuccessStatusCode();
            var product = await productResponse.Content.ReadFromJsonAsync<ProductResource>();
            return product.Id;
        }

        private static CheckoutResource Checkout(Guid productId, int quantity, string cardNumber = "4242 4242 4242 4242") => new()
        {
            ScheduledDate = NextSlot(),
            Notes = "Leave at the back door",
            Items = new List<SaveOrderItemResource> { new() { ProductId = productId, Quantity = quantity } },
            Payment = new PaymentCardResource
            {
                CardholderName = "Checkout Client",
                CardNumber = cardNumber,
                ExpiryMonth = 12,
                ExpiryYear = DateTime.UtcNow.Year + 2,
                Cvc = "123"
            }
        };

        [Fact]
        public async Task Checkout_ValidCard_CreatesPaidOrderAndReturnsEmailedReceipt()
        {
            var productId = await CreateProductAsync(12.50m);
            var client = await CreateClientUserAsync();

            var response = await client.PostAsJsonAsync("api/orders", Checkout(productId, 3));

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.EndsWith("/receipt", response.Headers.Location.ToString());
            var receipt = await response.Content.ReadFromJsonAsync<ReceiptResource>();
            Assert.Equal(37.50m, receipt.Total);
            Assert.Equal(37.50m, receipt.AmountPaid);
            Assert.Equal("Paid", receipt.PaymentStatus);
            Assert.Equal("Visa", receipt.CardBrand);
            Assert.Equal("4242", receipt.CardLast4);
            Assert.False(string.IsNullOrEmpty(receipt.TransactionId));
            Assert.Equal(receipt.ClientEmail, receipt.EmailedTo);
            Assert.Single(receipt.Items);

            var mine = await client.GetFromJsonAsync<OrderResource[]>("api/orders/mine");
            Assert.Contains(mine, o => o.Id == receipt.OrderId && o.PaymentStatus == "Paid");
        }

        [Fact]
        public async Task Checkout_ResponseNeverEchoesFullCardNumberOrCvc()
        {
            var productId = await CreateProductAsync(1m);
            var client = await CreateClientUserAsync();

            var response = await client.PostAsJsonAsync("api/orders", Checkout(productId, 1));
            var body = await response.Content.ReadAsStringAsync();

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.DoesNotContain("4242424242424242", body);
            Assert.DoesNotContain("4242 4242 4242 4242", body);
            Assert.DoesNotContain("\"cvc\"", body, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task Checkout_DeclinedCard_Returns400AndCreatesNoOrder()
        {
            var productId = await CreateProductAsync(5m);
            var client = await CreateClientUserAsync();

            var response = await client.PostAsJsonAsync("api/orders", Checkout(productId, 1, SimulatedPaymentService.DeclinedCard));

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            Assert.Contains("declined", await response.Content.ReadAsStringAsync());
            var mine = await client.GetFromJsonAsync<OrderResource[]>("api/orders/mine");
            Assert.Empty(mine);
        }

        [Fact]
        public async Task Checkout_MissingOrInvalidPayment_FailsValidation()
        {
            var productId = await CreateProductAsync(5m);
            var client = await CreateClientUserAsync();

            var noPayment = Checkout(productId, 1);
            noPayment.Payment = null;
            Assert.Equal(HttpStatusCode.BadRequest, (await client.PostAsJsonAsync("api/orders", noPayment)).StatusCode);

            var badLuhn = Checkout(productId, 1, "4242 4242 4242 4241");
            Assert.Equal(HttpStatusCode.BadRequest, (await client.PostAsJsonAsync("api/orders", badLuhn)).StatusCode);

            var expired = Checkout(productId, 1);
            expired.Payment.ExpiryYear = DateTime.UtcNow.Year - 1;
            Assert.Equal(HttpStatusCode.BadRequest, (await client.PostAsJsonAsync("api/orders", expired)).StatusCode);

            Assert.Empty(await client.GetFromJsonAsync<OrderResource[]>("api/orders/mine"));
        }

        [Fact]
        public async Task Receipt_OwnerAndStaffCanReadAndEmail_OtherClientIsForbidden()
        {
            var productId = await CreateProductAsync(4m);
            var owner = await CreateClientUserAsync();
            var created = await (await owner.PostAsJsonAsync("api/orders", Checkout(productId, 2)))
                .Content.ReadFromJsonAsync<ReceiptResource>();

            var ownerReceipt = await owner.GetAsync($"api/orders/{created.OrderId}/receipt");
            Assert.Equal(HttpStatusCode.OK, ownerReceipt.StatusCode);
            var receipt = await ownerReceipt.Content.ReadFromJsonAsync<ReceiptResource>();
            Assert.Equal(8m, receipt.Total);
            Assert.Null(receipt.EmailedTo);

            var resend = await owner.PostAsync($"api/orders/{created.OrderId}/receipt/email", null);
            Assert.Equal(HttpStatusCode.OK, resend.StatusCode);
            Assert.Equal(receipt.ClientEmail, (await resend.Content.ReadFromJsonAsync<ReceiptResource>()).EmailedTo);

            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            Assert.Equal(HttpStatusCode.OK, (await admin.GetAsync($"api/orders/{created.OrderId}/receipt")).StatusCode);

            var stranger = await CreateClientUserAsync();
            Assert.Equal(HttpStatusCode.Forbidden, (await stranger.GetAsync($"api/orders/{created.OrderId}/receipt")).StatusCode);
            Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsync($"api/orders/{created.OrderId}/receipt/email", null)).StatusCode);
        }

        [Fact]
        public async Task Receipt_UnknownOrder_Returns404()
        {
            var client = await CreateClientUserAsync();

            var response = await client.GetAsync($"api/orders/{Guid.NewGuid()}/receipt");

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task Cancel_PaidOrder_RefundsPaymentOnReceipt()
        {
            var productId = await CreateProductAsync(3m);
            var client = await CreateClientUserAsync();
            var created = await (await client.PostAsJsonAsync("api/orders", Checkout(productId, 1)))
                .Content.ReadFromJsonAsync<ReceiptResource>();

            var cancel = await client.DeleteAsync($"api/orders/{created.OrderId}");
            Assert.Equal(HttpStatusCode.NoContent, cancel.StatusCode);

            var receipt = await client.GetFromJsonAsync<ReceiptResource>($"api/orders/{created.OrderId}/receipt");
            Assert.Equal("Refunded", receipt.PaymentStatus);
            Assert.Equal("Cancelled", receipt.OrderStatus);
            Assert.NotNull(receipt.RefundedDate);
        }

        [Fact]
        public async Task Reject_PaidOrder_RefundsPayment()
        {
            var productId = await CreateProductAsync(3m);
            var client = await CreateClientUserAsync();
            var created = await (await client.PostAsJsonAsync("api/orders", Checkout(productId, 1)))
                .Content.ReadFromJsonAsync<ReceiptResource>();

            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var reject = await admin.PostAsJsonAsync($"api/orders/{created.OrderId}/reject", new AdminNotesRequest { AdminNotes = "Out of stock" });
            Assert.Equal(HttpStatusCode.OK, reject.StatusCode);
            Assert.Equal("Refunded", (await reject.Content.ReadFromJsonAsync<OrderResource>()).PaymentStatus);
        }
    }
}
