using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IOM.Core.Models
{
    public class Supplier : Base
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public IList<SupplierProduct> SupplierProduct { get; set; }
        public IList<InvoiceSupplier> InvoiceSuppliers { get; set; }
        

    }
}
