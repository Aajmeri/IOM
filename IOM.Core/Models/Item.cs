using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOM.Core.Models
{
    public class Item : Base
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("ProductId")]
        public Product Product {get; set;}
        public Guid ProductId {get; set; }
        public IList<InvoiceItem> InvoiceItem { get; set; }

    }
}
