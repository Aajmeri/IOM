using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Riok.Mapperly.Abstractions;

namespace IOM.Core.Models
{
    [Mapper]
    public partial class Product : Base
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public bool Visibility { get; set; } = true;

        public IList<SupplierProduct> SupplierProduct { get; set; }

    }
}
