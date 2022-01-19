using System;
using System.Collections.Generic;
using IOM.Core.Models;

namespace IOM.Api.Resources
{
    public class SaveProductResource
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }
        public decimal? Quantity { get; set; }

        public List<string> SKUs { get; set;}
    }
}