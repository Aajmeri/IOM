using System.Collections.Generic;
using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;
[Mapper]
public partial class ItemMapper
{
    [MapProperty("Product.Name", nameof(ItemResource.ProductName))]
    [MapProperty("Product.Barcode", nameof(ItemResource.Barcode))]
    public partial ItemResource ToResource(Item item);

    public partial IEnumerable<ItemResource> ToResource(IEnumerable<Item> items);

    public partial Item ToDomain(SaveItemResource resource);
}
