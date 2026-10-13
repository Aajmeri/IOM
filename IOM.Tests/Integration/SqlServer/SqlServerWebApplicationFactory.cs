using System;
using System.Linq;
using IOM.Core.Services;
using IOM.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace IOM.Tests.Integration.SqlServer
{
    /// <summary>
    /// Boots the real IOM.Api host against a brand-new, uniquely named SQL Server LocalDB database
    /// (the actual production provider), unlike <see cref="IomWebApplicationFactory"/>'s Sqlite.
    /// The schema is NOT pre-built: Program.cs's own <c>Database.Migrate()</c> applies the real
    /// migration history, so a broken or missing migration fails here. EF's
    /// PendingModelChangesWarning is deliberately left as an error (Program.cs's own registration
    /// ignores it) so a model change without a migration also fails startup.
    ///
    /// The database is dropped when the factory is disposed. Like the Sqlite host, this boots
    /// Program.cs (static FakeData seeding), so test classes using it must also join
    /// <see cref="IntegrationCollection"/> to run sequentially with every other host.
    /// </summary>
    public class SqlServerWebApplicationFactory : WebApplicationFactory<Program>
    {
        public string DatabaseName { get; } = $"IOM_IntegrationTests_{Guid.NewGuid():N}";

        public string ConnectionString =>
            $@"Server={LocalDb.Server};Database={DatabaseName};Trusted_Connection=True;TrustServerCertificate=True;";

        public CapturingEmailService Emails { get; } = new CapturingEmailService();

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseEnvironment("Testing");

            builder.ConfigureServices(services =>
            {
                var toRemove = services.Where(d =>
                    d.ServiceType == typeof(DbContextOptions<IOMContext>) ||
                    d.ServiceType == typeof(IOMContext) ||
                    (d.ServiceType.IsGenericType && d.ServiceType.GetGenericArguments().Contains(typeof(IOMContext))))
                    .ToList();
                foreach (var d in toRemove) services.Remove(d);

                services.AddDbContext<IOMContext>(options =>
                    options.UseSqlServer(ConnectionString, x => x.MigrationsAssembly("IOM.Data")));

                services.RemoveAll<IEmailService>();
                services.AddSingleton<IEmailService>(Emails);
            });
        }

        public IOMContext CreateDbContext()
            => new IOMContext(new DbContextOptionsBuilder<IOMContext>()
                .UseSqlServer(ConnectionString, x => x.MigrationsAssembly("IOM.Data"))
                .Options);

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing && LocalDb.IsAvailable)
            {
                try
                {
                    using var context = CreateDbContext();
                    context.Database.EnsureDeleted();
                }
                catch
                {
                    // Best effort - a leftover IOM_IntegrationTests_* database is harmless.
                }
            }
        }
    }
}
