using System.Collections.Generic;
using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;
[Mapper]
public partial class SupplierMapper
{
    public partial IEnumerable<SupplierResource> ToResource(IEnumerable<Supplier> Suppliers);
    public partial SupplierResource ToResource(Supplier Supplier);
    public partial Supplier ToDomain(SupplierResource resource);
}