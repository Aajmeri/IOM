using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;
using IOM.Api.Controllers.Api;
using IOM.Api.Resources;
using IOM.Core.Models;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace IOM.Tests.Integration.SqlServer
{
    /// <summary>
    /// The things Sqlite can't prove: that the real migration history builds a SQL Server schema
    /// matching the current model, and that provider-specific behaviour (decimal(18,4) columns,
    /// the filtered unique barcode index, unique Payment.OrderId, datetime2 slot matching) works.
    /// Skipped automatically when LocalDB isn't installed.
    /// </summary>
    [Collection(IntegrationCollection.Name)]
    public class SqlServerIntegrationTests : IClassFixture<SqlServerWebApplicationFactory>
    {
        private readonly SqlServerWebApplicationFactory _factory;
        private static int _slotCounter;

        public SqlServerIntegrationTests(SqlServerWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private static DateTime NextSlot()
        {
            var n = Interlocked.Increment(ref _slotCounter);
            return DateTime.Now.Date.AddDays(5 + n / 5).AddHours(8 + 2 * (n % 5));
        }

        private async Task<Guid> CreateProductAsync(decimal price, string barcode = null)
        {
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplier = await (await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"SQL Supplier {Guid.NewGuid()}" }))
                .Content.ReadFromJsonAsync<SupplierResource>();
            var response = await admin.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "SQL Widget",
                Price = price,
                Quantity = 100,
                Visibility = true,
                Barcode = barcode,
                SupplierId = supplier.Id
            });
            response.EnsureSuccessStatusCode();
            return (await response.Content.ReadFromJsonAsync<ProductResource>()).Id;
        }

        private static PaymentCardResource Card() => new()
        {
            CardholderName = "SQL Client",
            CardNumber = "4242424242424242",
            ExpiryMonth = 12,
            ExpiryYear = DateTime.UtcNow.Year + 2,
            Cvc = "123"
        };

        private static CheckoutResource Checkout(Guid productId, int quantity, DateTime slot, bool payLater) => new()
        {
            ScheduledDate = slot,
            Items = new List<SaveOrderItemResource> { new() { ProductId = productId, Quantity = quantity } },
            Payment = payLater ? null : Card(),
            PayLater = payLater
        };

        [SqlServerFact]
        public async Task Migrations_ApplyCleanly_AndMatchTheCurrentModel()
        {
            // Booting the host runs Program.cs's Database.Migrate() against the empty database.
            _factory.CreateClient();
            using var context = _factory.CreateDbContext();

            Assert.Empty(await context.Database.GetPendingMigrationsAsync());
            Assert.Contains((await context.Database.GetAppliedMigrationsAsync()), m => m.EndsWith("_AddOrderPayments"));
            Assert.False(context.Database.HasPendingModelChanges(),
                "The EF model has changes with no migration - run `dotnet ef migrations add` from IOM.Data.");
        }

        [SqlServerFact]
        public async Task Checkout_StoresFourDecimalPlaceAmountsExactly()
        {
            var productId = await CreateProductAsync(12.3456m);
            var client = await AuthHelper.CreateClientUserAsync(_factory);

            var response = await client.PostAsJsonAsync("api/orders", Checkout(productId, 3, NextSlot(), payLater: false));

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var receipt = await response.Content.ReadFromJsonAsync<ReceiptResource>();
            Assert.Equal(37.0368m, receipt.AmountPaid);

            using var context = _factory.CreateDbContext();
            var payment = await context.Payments.SingleAsync(p => p.OrderId == receipt.OrderId);
            Assert.Equal(37.0368m, payment.Amount);
            Assert.Equal(PaymentStatus.Paid, payment.Status);
            Assert.Equal(12.3456m, (await context.OrderItems.SingleAsync(oi => oi.OrderId == receipt.OrderId)).UnitPrice);
        }

        [SqlServerFact]
        public async Task PayLater_Pay_Reschedule_Cancel_FullLifecycle()
        {
            var productId = await CreateProductAsync(5m);
            var (client, email) = await AuthHelper.RegisterClientAsync(_factory);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);

            var order = await (await client.PostAsJsonAsync("api/orders", Checkout(productId, 2, NextSlot(), payLater: true)))
                .Content.ReadFromJsonAsync<OrderResource>();
            Assert.Equal("Unpaid", order.PaymentStatus);

            // Paying attaches a new Payment row to an already-saved order (an INSERT, not an UPDATE).
            var receipt = await (await client.PostAsJsonAsync($"api/orders/{order.Id}/pay", Card()))
                .Content.ReadFromJsonAsync<ReceiptResource>();
            Assert.Equal("Paid", receipt.PaymentStatus);
            Assert.Equal(10m, receipt.AmountPaid);

            var newSlot = NextSlot();
            var rescheduled = await (await admin.PostAsJsonAsync($"api/orders/{order.Id}/reschedule", new RescheduleOrderResource { ScheduledDate = newSlot }))
                .Content.ReadFromJsonAsync<OrderResource>();
            Assert.Equal(newSlot, rescheduled.ScheduledDate);

            Assert.Equal(HttpStatusCode.NoContent, (await client.DeleteAsync($"api/orders/{order.Id}")).StatusCode);

            using var context = _factory.CreateDbContext();
            var saved = await context.Orders.Include(o => o.Payment).SingleAsync(o => o.Id == order.Id);
            Assert.Equal(OrderStatus.Cancelled, saved.Status);
            Assert.Equal(newSlot, saved.ScheduledDate);
            Assert.Equal(PaymentStatus.Refunded, saved.Payment.Status);
            Assert.Contains(_factory.Emails.To(email), e => e.Subject.EndsWith("has been rescheduled"));
        }

        [SqlServerFact]
        public async Task SlotCapacity_IsEnforcedAndFreedByCancellation()
        {
            var productId = await CreateProductAsync(1m);
            var slot = NextSlot();
            var clients = new List<HttpClient>();
            var orderIds = new List<Guid>();

            for (var i = 0; i < 3; i++)
            {
                var client = await AuthHelper.CreateClientUserAsync(_factory);
                var response = await client.PostAsJsonAsync("api/orders", Checkout(productId, 1, slot, payLater: true));
                Assert.Equal(HttpStatusCode.Created, response.StatusCode);
                clients.Add(client);
                orderIds.Add((await response.Content.ReadFromJsonAsync<OrderResource>()).Id);
            }

            var fourth = await AuthHelper.CreateClientUserAsync(_factory);
            var full = await fourth.PostAsJsonAsync("api/orders", Checkout(productId, 1, slot, payLater: true));
            Assert.Equal(HttpStatusCode.BadRequest, full.StatusCode);
            Assert.Contains("fully booked", await full.Content.ReadAsStringAsync());

            (await clients[0].DeleteAsync($"api/orders/{orderIds[0]}")).EnsureSuccessStatusCode();

            var afterCancel = await fourth.PostAsJsonAsync("api/orders", Checkout(productId, 1, slot, payLater: true));
            Assert.Equal(HttpStatusCode.Created, afterCancel.StatusCode);
        }

        [SqlServerFact]
        public async Task Products_ManyWithoutBarcode_AreAllowedByTheFilteredUniqueIndex()
        {
            await CreateProductAsync(1m, barcode: null);
            await CreateProductAsync(1m, barcode: null);

            using var context = _factory.CreateDbContext();
            Assert.True(await context.Products.CountAsync(p => p.Barcode == null) >= 2);
        }

        [SqlServerFact]
        public async Task Products_DuplicateBarcode_IsRejected()
        {
            var barcode = $"SQL{DateTime.UtcNow.Ticks}";
            await CreateProductAsync(1m, barcode);
            var admin = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplier = await (await admin.PostAsJsonAsync("api/suppliers", new SaveSupplierResource { Name = $"SQL Supplier {Guid.NewGuid()}" }))
                .Content.ReadFromJsonAsync<SupplierResource>();

            var duplicate = await admin.PostAsJsonAsync("api/products", new SaveProductResource
            {
                Name = "Duplicate",
                Price = 1m,
                Barcode = barcode,
                SupplierId = supplier.Id
            });

            Assert.Equal(HttpStatusCode.BadRequest, duplicate.StatusCode);
        }

        [SqlServerFact]
        public async Task Database_AllowsAtMostOnePaymentPerOrder()
        {
            var productId = await CreateProductAsync(2m);
            var client = await AuthHelper.CreateClientUserAsync(_factory);
            var receipt = await (await client.PostAsJsonAsync("api/orders", Checkout(productId, 1, NextSlot(), payLater: false)))
                .Content.ReadFromJsonAsync<ReceiptResource>();

            using var context = _factory.CreateDbContext();
            context.Payments.Add(new Payment
            {
                OrderId = receipt.OrderId,
                Amount = 2m,
                Status = PaymentStatus.Paid,
                Method = "Card",
                TransactionId = "SIM-DUPLICATE",
                PaidDate = DateTime.UtcNow
            });

            await Assert.ThrowsAsync<DbUpdateException>(() => context.SaveChangesAsync());
        }
    }
}
