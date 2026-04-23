using System.Linq;

namespace IOM.Data
{
    public static class DataSeeder
    {
        public static void Seed(IOMContext context)
        {
            // Initialize fake data
            FakeData.Init(20);

            // Seed Products
            if (!context.Products.Any())
            {
                context.Products.AddRange(FakeData.Products);
                context.SaveChanges();
            }

            // Seed Suppliers
            if (!context.Suppliers.Any())
            {
                context.Suppliers.AddRange(FakeData.Suppliers);
                context.SaveChanges();
            }

            // Seed Items
            if (!context.Items.Any())
            {
                context.Items.AddRange(FakeData.Items);
                context.SaveChanges();
            }

            // Seed Invoices
            if (!context.Invoices.Any())
            {
                context.Invoices.AddRange(FakeData.Invoices);
                context.SaveChanges();
            }
        }
    }
}