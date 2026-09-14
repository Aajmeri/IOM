using System;
using System.Collections.Generic;

namespace IOM.Core.Models
{
    /// <summary>
    /// Result of processing an uploaded shipping-order CSV. Lives in IOM.Core (rather than
    /// IOM.Api) because it is produced by IInvoiceService/InvoiceService in IOM.Service, which
    /// cannot depend on IOM.Api. IOM.Api maps this to UploadResultResource for the wire contract.
    /// </summary>
    public class InvoiceUploadResult
    {
        public Guid? InvoiceId { get; set; }
        public int ProductsCreated { get; set; }
        public int ProductsMatched { get; set; }
        public int ItemsCreated { get; set; }
        public List<string> RowErrors { get; set; } = new List<string>();
    }
}
