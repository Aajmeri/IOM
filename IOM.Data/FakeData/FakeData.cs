
using System;
using System.Collections.Generic;
using Bogus;
using IOM.Core.Models;

namespace IOM.Data
{
    public static class FakeData
    {
        public static List<Supplier> Suppliers = new List<Supplier>();
        public static List<Product> Products = new List<Product>();
        public static List<SupplierProduct> SupplierProducts = new List<SupplierProduct>();
        public static List<Item> Items = new List<Item>();
        public static List<Invoice> Invoices = new List<Invoice>();
        public static List<InvoiceItem> InvoiceItems = new List<InvoiceItem>();
        public static List<InvoiceSupplier> InvoiceSupplier = new List<InvoiceSupplier>();
        public static List<User> Users = new List<User>();

        public static void Init(int count)
        {
            // var userFaker = new Faker<User>()
            //     .UseSeed(1)
            //     .RuleFor(x => x.Id, Guid.NewGuid) 
            //     .RuleFor(x => x.Name, x => x.Name.FirstName())
            //     .RuleFor(x => x.Email, x => "aajmeri7@gmail.com")
            //     .RuleFor(x => x.Password, x => "password123");

            //     var users = userFaker.Generate(count);
            //     FakeData.Users.AddRange(users);


            var productFaker = new Faker<Product>()
                .UseSeed(2)
                .RuleFor(x => x.Id, Guid.NewGuid) 
                .RuleFor(x => x.Name, x => x.Commerce.ProductName())
                .RuleFor(x => x.Description, x => x.Commerce.ProductDescription())
                .RuleFor(x => x.Price, x => x.Finance.Amount(1, 1000, 2))
                .RuleFor(x => x.Quantity, x => x.Random.Int(0, 500))
                .RuleFor(x => x.Visibility, x => true)
                .RuleFor(x => x.CreatedById, x => new Guid("380257E5-545A-4C63-A793-F79482B27057"))
                .RuleFor(x => x.Active, x => true)
                .RuleFor(x => x.UpdatedDate,x => x.Date.Recent());

                var products = productFaker.Generate(count);
                FakeData.Products.AddRange(products);


            var supplierFaker = new Faker<Supplier>()
                .UseSeed(3)
                .RuleFor(x => x.Id, Guid.NewGuid)                
                .RuleFor(x => x.Name, x => x.Company.CompanyName())
                .RuleFor(x => x.CreatedById, x => new Guid("380257E5-545A-4C63-A793-F79482B27057"))
                .RuleFor(x => x.Active, x => true)
                .RuleFor(x => x.UpdatedDate,x => x.Date.Recent());

                var suppliers = supplierFaker.Generate(count);
                FakeData.Suppliers.AddRange(suppliers);

            // var supplierProductFaker = new Faker<SupplierProduct>()
            //     .UseSeed(4)
            //     .RuleFor(x => x.SupplierId, x => x.PickRandom(suppliers).Id)
            //     .RuleFor(x => x.ProductId, x => x.PickRandom(products).Id);
            
            //     var supplierProducts = supplierProductFaker.Generate(count);
            //     FakeData.SupplierProducts.AddRange(supplierProducts);

            var itemFaker = new Faker<Item>()
                .UseSeed(5)
                .RuleFor(x => x.Id, Guid.NewGuid) 
                .RuleFor(x => x.ProductId, x => x.PickRandom(products).Id)
                .RuleFor(x => x.CreatedById, x => new Guid("380257E5-545A-4C63-A793-F79482B27057"))
                .RuleFor(x => x.Active, x => true)
                .RuleFor(x => x.UpdatedDate,x => x.Date.Recent());
            
                var items = itemFaker.Generate(count);
                FakeData.Items.AddRange(items);

        // Guid guid = new Guid("36D7C4B3-57C8-4937-AF88-66FFBC2406EF");

            var invoiceFaker = new Faker<Invoice>()
                .UseSeed(6)
                .RuleFor(x => x.Id, Guid.NewGuid) 
                .RuleFor(x => x.Number, x => x.Random.Number(0,10000).ToString())
                .RuleFor(x => x.Total, x => x.Random.Number(0,10000).ToString())
                .RuleFor(x => x.CreatedDate, x => x.Date.Recent())
                .RuleFor(x => x.CreatedById, x => new Guid("380257E5-545A-4C63-A793-F79482B27057"))
                .RuleFor(x => x.Active, x => true)
                .RuleFor(x => x.UpdatedDate,x => x.Date.Recent());
           
                var invoices = invoiceFaker.Generate(count);
                FakeData.Invoices.AddRange(invoices);           

            // var invoiceItemFaker = new Faker<InvoiceItem>()
            //     .UseSeed(7)
            //     .RuleFor(x => x.ItemId, x => x.PickRandom(items).Id)
            //     .RuleFor(x => x.InvoiceId, x => x.PickRandom(invoices).Id);
            
            //     var invoiceItems = invoiceItemFaker.Generate(count);
            //     FakeData.InvoiceItems.AddRange(invoiceItems);

            // var invoiceSupplierFaker = new Faker<InvoiceSupplier>()
            //     .UseSeed(8)
            //     .RuleFor(x => x.SupplierId, x => x.PickRandom(suppliers).Id)
            //     .RuleFor(x => x.InvoiceId, x => x.PickRandom(invoices).Id);
            
            //     var invoiceSuppliers = invoiceSupplierFaker.Generate(count);
            //     FakeData.InvoiceSupplier.AddRange(invoiceSuppliers);

            // var userFaker = new Faker<Item>()
            // .RuleFor(x => x.Product, x => productFaker);
        }
    }
}