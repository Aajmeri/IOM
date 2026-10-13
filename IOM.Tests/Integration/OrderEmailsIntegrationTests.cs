using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;
using IOM.Api.Controllers.Api;
using IOM.Api.Resources;
using Xunit;

namespace IOM.Tests.Integration
{
    /// <summary>
    /// End-to-end through the real API: which emails each order action sends, to whom, and what
    /// they say. Emails are captured by <see cref="CapturingEmailService"/> instead of being sent.
    /// </summary>
    [Collection(IntegrationCollection.Name)]
    public class OrderEmailsIntegrationTests
    {
        private readonly IomWebApplicationFactory _factory;

        // Own slot range (days 25+) so slot capacity never interferes with other order test classes.
        private static int _slotCounter;

        public OrderEmailsIntegrationTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private static DateTime NextSlot()
        {
            var n = Interlocked.Increment(ref _slotCounter);
            return DateTime.Now.Date.AddDays(25 + n / 5).AddHours(8 + 2 * (n % 5));
        }

        private static PaymentCardResource Card() => new()
        {
            CardholderName = "Email Client",
            CardNumber = "4242 4242 4242 4242",
            ExpiryMonth = 12,
            ExpiryYear = DateTime.UtcNow.Year + 2,
            Cvc = "123"
        };

        private async Task<Guid> CreateProductAsync(string name, decimal price)
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplier = await (await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"Email Supplier {Guid.NewGuid()}" }))
                .Content.ReadFromJsonAsync<SupplierResource>();
            var response = await admin.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = name,
                Price = price,
                Quantity = 100,
                Visibility = true,
                SupplierId = supplier.Id
            });
            response.EnsureSuccessStatusCode();
            return (await response.Content.ReadFromJsonAsync<ProductResource>()).Id;
        }

        private async Task<(HttpClient client, string email, Guid orderId)> CheckoutAsync(bool payLater, string productName = "Email Widget", decimal price = 6.25m, int quantity = 2)
        {
            var productId = await CreateProductAsync(productName, price);
            var (client, email) = await AuthHelper.RegisterClientAsync(_factory);
            var response = await client.PostAsJsonAsync("api/orders", new CheckoutResource
            {
                ScheduledDate = NextSlot(),
                Items = new List<SaveOrderItemResource> { new() { ProductId = productId, Quantity = quantity } },
                Payment = payLater ? null : Card(),
                PayLater = payLater
            });
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            var id = payLater
                ? System.Text.Json.JsonDocument.Parse(body).RootElement.GetProperty("id").GetGuid()
                : System.Text.Json.JsonDocument.Parse(body).RootElement.GetProperty("orderId").GetGuid();
            return (client, email, id);
        }

        [Fact]
        public async Task Checkout_EmailsReceipt_WithLinesTotalAndOnlyTheMaskedCard()
        {
            var (_, email, _) = await CheckoutAsync(payLater: false, productName: "Receipt Gadget", price: 6.25m, quantity: 2);

            var sent = Assert.Single(_factory.Emails.To(email));
            Assert.StartsWith("Your receipt for order ORD-", sent.Subject);
            Assert.Contains("Receipt Gadget", sent.Body);
            Assert.Contains("2 x $6.25", sent.Body);
            Assert.Contains("$12.50", sent.Body);
            Assert.Contains("Visa ending in 4242", sent.Body);
            Assert.DoesNotContain("4242424242424242", sent.Body);
            Assert.DoesNotContain("4242 4242 4242 4242", sent.Body);
        }

        [Fact]
        public async Task ResendReceipt_SendsAnotherCopy()
        {
            var (client, email, orderId) = await CheckoutAsync(payLater: false);

            (await client.PostAsync($"api/orders/{orderId}/receipt/email", null)).EnsureSuccessStatusCode();

            var receipts = _factory.Emails.To(email);
            Assert.Equal(2, receipts.Count);
            Assert.All(receipts, r => Assert.StartsWith("Your receipt for order", r.Subject));
        }

        [Fact]
        public async Task PayLater_SendsNothingUntilPaid_ThenEmailsTheReceipt()
        {
            var (client, email, orderId) = await CheckoutAsync(payLater: true);
            Assert.Empty(_factory.Emails.To(email));

            (await client.PostAsJsonAsync($"api/orders/{orderId}/pay", Card())).EnsureSuccessStatusCode();

            var sent = Assert.Single(_factory.Emails.To(email));
            Assert.StartsWith("Your receipt for order", sent.Subject);
            Assert.Contains("Visa ending in 4242", sent.Body);
        }

        [Fact]
        public async Task Accept_EmailsTheClientThatTheOrderWasApproved()
        {
            var (_, email, orderId) = await CheckoutAsync(payLater: true);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            (await admin.PostAsJsonAsync($"api/orders/{orderId}/approve", new AdminNotesRequest { AdminNotes = "See you then" })).EnsureSuccessStatusCode();

            var sent = Assert.Single(_factory.Emails.To(email));
            Assert.EndsWith("has been approved", sent.Subject);
            Assert.Contains("See you then", sent.Body);
        }

        [Fact]
        public async Task Reject_PaidOrder_EmailMentionsTheReasonAndTheRefund()
        {
            var (_, email, orderId) = await CheckoutAsync(payLater: false, price: 4m, quantity: 3);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            (await admin.PostAsJsonAsync($"api/orders/{orderId}/reject", new AdminNotesRequest { AdminNotes = "Out of stock" })).EnsureSuccessStatusCode();

            var rejection = _factory.Emails.To(email).Single(e => e.Subject.EndsWith("has been rejected"));
            Assert.Contains("Out of stock", rejection.Body);
            Assert.Contains("A refund of $12.00", rejection.Body);
            Assert.Contains("ending in 4242", rejection.Body);
        }

        [Fact]
        public async Task Reject_UnpaidOrder_EmailDoesNotMentionARefund()
        {
            var (_, email, orderId) = await CheckoutAsync(payLater: true);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            (await admin.PostAsJsonAsync($"api/orders/{orderId}/reject", new AdminNotesRequest { AdminNotes = "Out of stock" })).EnsureSuccessStatusCode();

            var rejection = Assert.Single(_factory.Emails.To(email));
            Assert.DoesNotContain("refund", rejection.Body, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task Reschedule_EmailsOldSlotNewSlotAndReason()
        {
            var (client, email, orderId) = await CheckoutAsync(payLater: true);
            var before = await client.GetFromJsonAsync<OrderResource>($"api/orders/{orderId}");
            var newSlot = NextSlot();
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            (await admin.PostAsJsonAsync($"api/orders/{orderId}/reschedule", new RescheduleOrderResource
            {
                ScheduledDate = newSlot,
                Reason = "Driver shortage"
            })).EnsureSuccessStatusCode();

            var sent = Assert.Single(_factory.Emails.To(email));
            Assert.Equal($"Your order {before.Number} has been rescheduled", sent.Subject);
            Assert.Contains(before.ScheduledDate.ToString("yyyy-MM-dd HH:mm"), sent.Body);
            Assert.Contains(newSlot.ToString("yyyy-MM-dd HH:mm"), sent.Body);
            Assert.Contains("Driver shortage", sent.Body);
        }

        [Fact]
        public async Task FailedReschedule_SendsNoEmail()
        {
            var (_, email, orderId) = await CheckoutAsync(payLater: true);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var response = await admin.PostAsJsonAsync($"api/orders/{orderId}/reschedule", new RescheduleOrderResource
            {
                ScheduledDate = NextSlot().AddMinutes(30)
            });

            Assert.False(response.IsSuccessStatusCode);
            Assert.Empty(_factory.Emails.To(email));
        }

        [Fact]
        public async Task DeclinedCheckout_SendsNoEmail()
        {
            var productId = await CreateProductAsync("Declined Widget", 2m);
            var (client, email) = await AuthHelper.RegisterClientAsync(_factory);
            var card = Card();
            card.CardNumber = "4000 0000 0000 0002";

            var response = await client.PostAsJsonAsync("api/orders", new CheckoutResource
            {
                ScheduledDate = NextSlot(),
                Items = new List<SaveOrderItemResource> { new() { ProductId = productId, Quantity = 1 } },
                Payment = card
            });

            Assert.False(response.IsSuccessStatusCode);
            Assert.Empty(_factory.Emails.To(email));
        }
    }
}
