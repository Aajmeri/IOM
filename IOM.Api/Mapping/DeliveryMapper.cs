using System;
using System.Collections.Generic;
using System.Linq;
using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;

[Mapper]
public partial class DeliveryMapper
{
    // Manual mapping: Status is an enum on the domain model but a string on the wire, and
    // SupplierName is flattened out of the Supplier navigation property.
    public DeliveryResource ToResource(Delivery delivery)
    {
        if (delivery == null) return null;

        return new DeliveryResource
        {
            Id = delivery.Id,
            SupplierId = delivery.SupplierId,
            SupplierName = delivery.Supplier?.Name,
            ScheduledDate = delivery.ScheduledDate,
            Status = delivery.Status.ToString(),
            InvoiceId = delivery.InvoiceId,
            Notes = delivery.Notes,
            Active = delivery.Active
        };
    }

    public IEnumerable<DeliveryResource> ToResource(IEnumerable<Delivery> deliveries)
        => deliveries?.Select(ToResource);

    public Delivery ToDomain(SaveDeliveryResource resource)
    {
        if (resource == null) return null;

        return new Delivery
        {
            SupplierId = resource.SupplierId,
            ScheduledDate = resource.ScheduledDate,
            Status = Enum.TryParse<DeliveryStatus>(resource.Status, true, out var status)
                ? status
                : DeliveryStatus.Scheduled,
            InvoiceId = resource.InvoiceId,
            Notes = resource.Notes
        };
    }
}
