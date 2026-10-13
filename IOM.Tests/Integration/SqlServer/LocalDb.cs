using System;
using Microsoft.Data.SqlClient;
using Xunit;

namespace IOM.Tests.Integration.SqlServer
{
    /// <summary>Whether SQL Server LocalDB is reachable on this machine (checked once per test run).</summary>
    public static class LocalDb
    {
        public const string Server = @"(localdb)\MSSQLLocalDB";

        private static readonly Lazy<bool> Available = new(() =>
        {
            try
            {
                using var connection = new SqlConnection($"Server={Server};Database=master;Trusted_Connection=True;TrustServerCertificate=True;Connect Timeout=15;");
                connection.Open();
                return true;
            }
            catch
            {
                return false;
            }
        });

        public static bool IsAvailable => Available.Value;
    }

    /// <summary>
    /// A [Fact] that is skipped (not failed) when LocalDB isn't installed, e.g. on a Linux CI agent.
    /// </summary>
    public sealed class SqlServerFactAttribute : FactAttribute
    {
        public SqlServerFactAttribute()
        {
            if (!LocalDb.IsAvailable)
            {
                Skip = $"SQL Server LocalDB ({LocalDb.Server}) is not available on this machine.";
            }
        }
    }
}
