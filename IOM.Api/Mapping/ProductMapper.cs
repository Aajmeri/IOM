using System.Collections.Generic;
using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;
[Mapper]
public partial class ProductMapper
{
    public partial Product ToDomain(SaveProductResource resource);
    public partial IEnumerable<ProductResource> ToResource(IEnumerable<Product> products);
    public partial ProductResource ToResource(Product product);
    public partial Product ToDomain(ProductResource resource);
}