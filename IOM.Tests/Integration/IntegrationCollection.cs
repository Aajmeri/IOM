using Xunit;

namespace IOM.Tests.Integration
{
    /// <summary>
    /// All integration test classes share ONE IomWebApplicationFactory/host instance and run
    /// sequentially (xUnit collections run tests within them sequentially by default). This is
    /// required, not just an optimization: Program.cs's startup seeding
    /// (IOM.Data.DataSeeder.Seed -> FakeData.Init) mutates process-wide static lists that are not
    /// thread-safe, so spinning up multiple factories/hosts concurrently (xUnit's default
    /// parallel-by-class behavior) intermittently corrupts that shared static state.
    /// </summary>
    [CollectionDefinition(Name)]
    public class IntegrationCollection : ICollectionFixture<IomWebApplicationFactory>
    {
        public const string Name = "Integration";
    }
}
