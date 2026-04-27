using IOM.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace IOM.Data
{
    public class IOMContext : DbContext
    {

        public IOMContext(DbContextOptions<IOMContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InvoiceItem>().HasKey(ii => new { ii.InvoiceId, ii.ItemId });
            modelBuilder.Entity<SupplierProduct>().HasKey(sp => new { sp.SupplierId, sp.ProductId });
            modelBuilder.Entity<InvoiceSupplier>().HasKey(ip => new { ip.SupplierId, ip.InvoiceId });
            modelBuilder.Entity<Product>().Property(p => p.Price).HasColumnType("decimal(18,4)");

            // FakeData.Init(100);
            // // modelBuilder.Entity<User>().HasData(FakeData.Users);
            // modelBuilder.Entity<Supplier>().HasData(FakeData.Suppliers);
            // modelBuilder.Entity<Product>().HasData(FakeData.Products);
            // modelBuilder.Entity<Item>().HasData(FakeData.Items);
            // modelBuilder.Entity<Invoice>().HasData(FakeData.Invoices);
            
            // modelBuilder.Entity<InvoiceItem>().HasData(FakeData.InvoiceItems);
            // modelBuilder.Entity<InvoiceSupplier>().HasData(FakeData.InvoiceSupplier);
            // modelBuilder.Entity<SupplierProduct>().HasData(FakeData.SupplierProducts);
        }


        // Entities        
        public DbSet<Item> Items { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<InvoiceSupplier> InvoiceSuppliers { get; set; }
        public DbSet<SupplierProduct> SupplierProducts { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
