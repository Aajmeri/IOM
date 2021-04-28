using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOM.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace IOM.Api.Pages.Products
{
    public class ProductModel : PageModel
    {
        private readonly ILogger<ProductModel> _logger;

        public ProductModel(ILogger<ProductModel> logger)
        {
            _logger = logger;
        }
        public void OnGet()
        {
        }
    }
}