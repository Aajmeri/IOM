using System;
using System.Linq;
using IOM.Core.Services;
using IOM.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace IOM.Tests.Integration
{
    /// <summary>
    /// Boots the real IOM.Api host (Program.cs, unmodified) against an in-memory Sqlite database
    /// instead of SQL Server. Program.cs unconditionally runs `context.Database.Migrate()` and
    /// seeds fake data + the admin user on startup; both run harmlessly here since they execute
    /// against this throwaway Sqlite connection, not a real database.
    ///
    /// The Sqlite connection is opened once and kept open for the lifetime of the factory - a
    /// closed in-memory Sqlite connection loses its data, and each new connection to
    /// "DataSource=:memory:" gets its own separate empty database.
    /// </summary>
    public class IomWebApplicationFactory : WebApplicationFactory<Program>
    {
        private readonly SqliteConnection _connection = new SqliteConnection("DataSource=:memory:");

        /// <summary>Every email the API "sent" during this host's lifetime (nothing really goes out).</summary>
        public CapturingEmailService Emails { get; } = new CapturingEmailService();

        public IomWebApplicationFactory()
        {
            _connection.Open();
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseEnvironment("Testing");

            builder.ConfigureServices(services =>
            {
                // Program.cs already registered DbContextOptions<IOMContext> pointed at SQL
                // Server (plus provider-internal descriptors keyed on IOMContext, e.g.
                // IDbContextOptionsConfiguration<IOMContext>). Removing only the
                // DbContextOptions<IOMContext> descriptor leaves those provider-internal ones
                // behind, and EF Core then complains that both the SqlServer and Sqlite providers
                // are registered - so remove everything generic-over-IOMContext before re-adding.
                var toRemove = services.Where(d =>
                    d.ServiceType == typeof(DbContextOptions<IOMContext>) ||
                    d.ServiceType == typeof(IOMContext) ||
                    (d.ServiceType.IsGenericType && d.ServiceType.GetGenericArguments().Contains(typeof(IOMContext))))
                    .ToList();
                foreach (var d in toRemove) services.Remove(d);

                services.RemoveAll<IEmailService>();
                services.AddSingleton<IEmailService>(Emails);

                // Matches the .ConfigureWarnings(...) on Program.cs's own (removed) SqlServer
                // registration - without it, EF Core throws PendingModelChangesWarning as an error
                // during Program.cs's Migrate() call below, since our fresh Sqlite registration has
                // no migration snapshot check history of its own.
                services.AddDbContext<IOMContext>(options => options
                    .UseSqlite(_connection)
                    .ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning)));

                // Program.cs calls context.Database.Migrate() unconditionally on startup, but a
                // fresh Sqlite in-memory database has no __EFMigrationsHistory table, and Migrate()
                // would try to run every migration from scratch. EnsureCreated() builds the schema
                // directly from the current model, which is simpler and more reliable than
                // replaying the full (SQL-Server-authored) migration history against Sqlite - so we
                // build the schema here first (via a standalone context, not one resolved from the
                // partially-configured `services` collection) and stamp the migrations history
                // table as fully applied, making Program.cs's subsequent Migrate() call a no-op.
                var options = new DbContextOptionsBuilder<IOMContext>().UseSqlite(_connection).Options;
                using var context = new IOMContext(options);
                context.Database.EnsureCreated();
                StampMigrationsHistory(context);
            });
        }

        private static void StampMigrationsHistory(IOMContext context)
        {
            context.Database.ExecuteSqlRaw(
                "CREATE TABLE IF NOT EXISTS \"__EFMigrationsHistory\" (" +
                "\"MigrationId\" TEXT NOT NULL CONSTRAINT \"PK___EFMigrationsHistory\" PRIMARY KEY, " +
                "\"ProductVersion\" TEXT NOT NULL);");

            foreach (var migrationId in context.Database.GetMigrations())
            {
                context.Database.ExecuteSqlRaw(
                    "INSERT OR IGNORE INTO \"__EFMigrationsHistory\" (\"MigrationId\", \"ProductVersion\") VALUES ({0}, {1});",
                    migrationId, "10.0.5");
            }
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing)
            {
                _connection.Dispose();
            }
        }
    }
}
