using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Api.Mapping;
using IOM.Api.Resources;
using IOM.Core.Models;
using IOM.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IOM.Api.Controllers
{
	// [Route("api/[controller]")]
	// [ApiController]
	public class ProductController : Controller
	{
		private readonly ILogger<ProductController> _logger;
		private readonly IProductService _productService;
		private readonly  ProductMapper _mapper;
		public ProductController(ILogger<ProductController> logger, IProductService productService
		, ProductMapper mapper)
		{
			_logger = logger;
			_productService = productService;
			_mapper = mapper;
		}

		// public IActionResult Index()
		// {
		// 	return View(ProductResource);
		// }

		[HttpGet]
		public async Task<ActionResult<IEnumerable<ProductResource>>> Index()
		{
			var products = await _productService.GetAllWithSupplierProduct();
			var productResources = _mapper.ToResource(products);
			return View(productResources);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ProductResource>> GetProductById(Guid id)
		{
			var product = await _productService.GetProductById(id);
			var productResource = _mapper.ToResource(product);

			return Ok(productResource);
		}

		[HttpPost("")]
		public async Task<ActionResult<ProductResource>> CreateProduct ([FromBody] SaveProductResource saveProductResource)
		{
			var productToCreate = _mapper.ToDomain(saveProductResource);

			var newProduct = await _productService.CreateProduct(productToCreate);

			var product = await _productService.GetProductById(newProduct.Id);

			var productResource = _mapper.ToResource(product); 

			return Ok(productResource);
		}

		// [HttpPut("{id}")]
		// public async Task<ActionResult<ProductResource>> UpdateProduct (int id, [FromBody] SaveProductResource saveProductResource)
		// {

		// }
	}
}
