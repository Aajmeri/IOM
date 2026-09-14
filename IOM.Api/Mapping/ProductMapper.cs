using System.Collections.Generic;
using System.Linq;
using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;
[Mapper]
public partial class ProductMapper
{
    public partial Product ToDomain(SaveProductResource resource);
    public partial Product ToDomain(ProductResource resource);

    public IEnumerable<ProductResource> ToResource(IEnumerable<Product> products)
        => products?.Select(ToResource);

    // Manual (not source-generated) because SupplierId/SupplierName are flattened out of the
    // Product.SupplierProduct join collection (single-primary-supplier-from-the-API's-perspective).
    public ProductResource ToResource(Product product)
    {
        if (product == null) return null;

        var resource = ToResourceCore(product);
        var supplierProduct = product.SupplierProduct?.FirstOrDefault();
        resource.SupplierId = supplierProduct?.SupplierId;
        resource.SupplierName = supplierProduct?.Supplier?.Name;
        return resource;
    }

    [MapperIgnoreTarget(nameof(ProductResource.SupplierId))]
    [MapperIgnoreTarget(nameof(ProductResource.SupplierName))]
    private partial ProductResource ToResourceCore(Product product);

    // Client-safe view: no Barcode/SupplierId/SupplierName.
    public partial ClientProductResource ToClientResource(Product product);

    public IEnumerable<ClientProductResource> ToClientResource(IEnumerable<Product> products)
        => products?.Select(ToClientResource);
}
