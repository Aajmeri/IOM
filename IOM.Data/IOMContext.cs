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
            modelBuilder.Entity<Product>().Property(p => p.Barcode).HasMaxLength(64);
            // Unique so barcode lookups (scan-in, CSV shipping-order matching) can safely assume
            // at most one match. Unlike Postgres, a plain SQL Server unique index treats multiple
            // NULLs as a duplicate-key violation - but EF Core's SQL Server provider automatically
            // emits this as a filtered index (WHERE [Barcode] IS NOT NULL) because Barcode is a
            // nullable property, so products without a barcode yet are unaffected. Confirmed via
            // the generated EnforceUniqueProductBarcode migration.
            modelBuilder.Entity<Product>().HasIndex(p => p.Barcode).IsUnique();
            modelBuilder.Entity<Delivery>().Property(d => d.Status).HasConversion<string>();
            modelBuilder.Entity<OrderItem>().HasKey(oi => new { oi.OrderId, oi.ProductId });
            modelBuilder.Entity<OrderItem>().Property(oi => oi.UnitPrice).HasColumnType("decimal(18,4)");
            modelBuilder.Entity<Order>().Property(o => o.Status).HasConversion<string>();
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Payment)
                .WithOne(p => p.Order)
                .HasForeignKey<Payment>(p => p.OrderId);
            modelBuilder.Entity<Payment>().Property(p => p.Amount).HasColumnType("decimal(18,4)");
            modelBuilder.Entity<Payment>().Property(p => p.Status).HasConversion<string>().HasMaxLength(16);

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
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }

    }
}
