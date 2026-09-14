using System;
using System.Collections.Generic;

namespace IOM.Api.Resources
{
    public class UploadResultResource
    {
        public Guid? InvoiceId { get; set; }
        public int ProductsCreated { get; set; }
        public int ProductsMatched { get; set; }
        public int ItemsCreated { get; set; }
        public List<string> RowErrors { get; set; } = new List<string>();
    }
}
