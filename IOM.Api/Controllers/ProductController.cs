using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
		private readonly  IMapper _mapper;

		public ProductController(ILogger<ProductController> logger, IProductService productService
		, IMapper mapper)
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
			var productResources = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
			return View(productResources);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ProductResource>> GetProductById(Guid id)
		{
			var product = await _productService.GetProductById(id);
			var productResource = _mapper.Map<Product, ProductResource>(product);

			return Ok(productResource);
		}

		[HttpPost("")]
		public async Task<ActionResult<ProductResource>> CreateProduct ([FromBody] SaveProductResource saveProductResource)
		{
			var productToCreate = _mapper.Map<SaveProductResource, Product>(saveProductResource);

			var newProduct = await _productService.CreateProduct(productToCreate);

			var product = await _productService.GetProductById(newProduct.Id);

			var productResource = _mapper.Map<Product, ProductResource>(product);

			return Ok(productResource);
		}

		// [HttpPut("{id}")]
		// public async Task<ActionResult<ProductResource>> UpdateProduct (int id, [FromBody] SaveProductResource saveProductResource)
		// {

		// }
	}
}
