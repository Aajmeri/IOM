using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace IOM.Data
{
    public class IOMContextFactory : IDesignTimeDbContextFactory<IOMContext>
    {
        public IOMContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<IOMContext>();
            optionsBuilder.UseSqlServer(
                "Server=(localdb)\\MSSQLLocalDB;Database=IOM;Trusted_Connection=True;TrustServerCertificate=True;",
                x => x.MigrationsAssembly("IOM.Data"));

            return new IOMContext(optionsBuilder.Options);
        }
    }
}