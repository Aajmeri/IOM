using AutoMapper;
using IOM.Api.Resources;
using IOM.Core.Models;

namespace IOM.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
             // Domain to Resource
            CreateMap<Supplier, SupplierResource>();
            CreateMap<Item, ItemResource>();
            CreateMap<Product, ProductResource>();
            CreateMap<Invoice, InvoiceResource>();

          
            
            // Resource to Domain
            CreateMap<SupplierResource, Supplier>();
            CreateMap<ItemResource, Item>();
            CreateMap<ProductResource, Product>();
            CreateMap<InvoiceResource, Invoice>();


            // CreateMap<Product, SaveProductResource>();
            CreateMap<SaveProductResource, Product>();
            
        }
    }
}