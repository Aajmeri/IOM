using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IOM.Core.Models
{
    public class Invoice : Base
    {
        [Key]
        public Guid Id { get; set; }
        public string Number { get; set; }
        public string Total { get; set; }
        public IList<InvoiceSupplier> InvoiceSuppliers {get; set;}
        public IList<InvoiceItem> InvoiceItems {get; set;}
    }
}
