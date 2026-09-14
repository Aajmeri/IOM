using System;
using System.Collections.Generic;
using System.Linq;
using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;

[Mapper]
public partial class OrderMapper
{
    // Manual mapping: OrderResource is a deliberately flat shape (ClientName pulled from the
    // Client navigation property, Items summarized from OrderItem -> Product, Total computed)
    // so System.Text.Json never walks the Order <-> OrderItem <-> Product reference cycle.
    public OrderResource ToResource(Order order)
    {
        if (order == null) return null;

        // UnitPrice/Total are read from the OrderItem's own snapshotted price (set at line-add
        // time), not the product's current, possibly-since-changed price - see OrderItem.UnitPrice.
        var items = order.OrderItems?.Select(oi => new OrderItemSummary
        {
            ProductId = oi.ProductId,
            ProductName = oi.Product?.Name,
            Quantity = oi.Quantity,
            UnitPrice = oi.UnitPrice
        }).ToList() ?? new List<OrderItemSummary>();

        return new OrderResource
        {
            Id = order.Id,
            Number = order.Number,
            ClientId = order.ClientId,
            ClientName = order.Client?.Name,
            ScheduledDate = order.ScheduledDate,
            Status = order.Status.ToString(),
            Notes = order.Notes,
            AdminNotes = order.AdminNotes,
            Total = items.Sum(i => i.UnitPrice * i.Quantity),
            CreatedDate = order.CreatedDate,
            Items = items
        };
    }

    public IEnumerable<OrderResource> ToResource(IEnumerable<Order> orders)
        => orders?.Select(ToResource);

    public IEnumerable<(Guid ProductId, int Quantity)> ToOrderItems(IEnumerable<SaveOrderItemResource> items)
        => items?.Select(i => (i.ProductId, i.Quantity)) ?? Enumerable.Empty<(Guid, int)>();

    public DaySlotsResource ToResource(DaySlots daySlots)
    {
        if (daySlots == null) return null;

        return new DaySlotsResource
        {
            Date = daySlots.Date,
            Slots = daySlots.Slots?.Select(s => new SlotResource
            {
                Start = s.Start,
                End = s.End,
                Available = s.Available
            }).ToList() ?? new List<SlotResource>()
        };
    }

    public IEnumerable<DaySlotsResource> ToResource(IEnumerable<DaySlots> daySlots)
        => daySlots?.Select(ToResource);
}
