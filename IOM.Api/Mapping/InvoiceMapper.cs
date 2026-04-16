using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;
[Mapper]
public partial class InvoiceMapper
{
    public partial InvoiceResource ToResource(Invoice Invoice);
    public partial Invoice ToDomain(InvoiceResource resource);
}