using System;
using System.Collections.Generic;
using System.Linq;
using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;

[Mapper]
public partial class InvoiceMapper
{
    // Manual mapping: InvoiceResource is a deliberately flat shape (SupplierId/SupplierName
    // pulled from the first InvoiceSupplier, Items summarized from InvoiceItem -> Item ->
    // Product) so System.Text.Json never walks the Invoice <-> Item <-> Product reference cycle.
    public InvoiceResource ToResource(Invoice invoice)
    {
        if (invoice == null) return null;

        var invoiceSupplier = invoice.InvoiceSupplier?.FirstOrDefault();

        return new InvoiceResource
        {
            Id = invoice.Id,
            Number = invoice.Number,
            Total = invoice.Total,
            SupplierId = invoiceSupplier?.SupplierId,
            SupplierName = invoiceSupplier?.Supplier?.Name,
            CreatedDate = invoice.CreatedDate,
            Items = invoice.InvoiceItem?.Select(ii => new InvoiceItemSummary
            {
                ItemId = ii.ItemId,
                ProductId = ii.Item?.ProductId ?? Guid.Empty,
                ProductName = ii.Item?.Product?.Name,
                Quantity = ii.Item?.Quantity ?? 0,
                ExpirationDate = ii.Item?.ExpirationDate
            }).ToList() ?? new List<InvoiceItemSummary>()
        };
    }

    public IEnumerable<InvoiceResource> ToResource(IEnumerable<Invoice> invoices)
        => invoices?.Select(ToResource);

    public UploadResultResource ToResource(InvoiceUploadResult result)
    {
        if (result == null) return null;

        return new UploadResultResource
        {
            InvoiceId = result.InvoiceId,
            ProductsCreated = result.ProductsCreated,
            ProductsMatched = result.ProductsMatched,
            ItemsCreated = result.ItemsCreated,
            RowErrors = result.RowErrors
        };
    }
}
