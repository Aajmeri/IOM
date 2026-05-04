using System;
using System.Threading.Tasks;
using IOM.Api.Mapping;
using IOM.Api.Resources;
using IOM.Core.Models;
using IOM.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IOM.Api.Controllers
{
	[Authorize]
	public class ProductController : Controller
	{
		private readonly ILogger<ProductController> _logger;
		private readonly IProductService _productService;
		private readonly ProductMapper _mapper;

		public ProductController(ILogger<ProductController> logger, IProductService productService, ProductMapper mapper)
		{
			_logger = logger;
			_productService = productService;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<IActionResult> Index()
		{
			var products = await _productService.GetAllWithSupplierProduct();
			return View(_mapper.ToResource(products));
		}

		[Authorize(Roles = "Admin,Warehouse")]
		[HttpGet]
		public IActionResult Create()
		{
			return View(new SaveProductResource { Visibility = true });
		}

		[Authorize(Roles = "Admin,Warehouse")]
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create(SaveProductResource model)
		{
			if (!ModelState.IsValid) return View(model);
			var product = _mapper.ToDomain(model);
			await _productService.CreateProduct(product);
			return RedirectToAction(nameof(Index));
		}

		[Authorize(Roles = "Admin,Warehouse")]
		[HttpGet]
		public async Task<IActionResult> Edit(Guid id)
		{
			var product = await _productService.GetProductById(id);
			if (product == null) return NotFound();
			var model = new SaveProductResource
			{
				Name = product.Name,
				Description = product.Description,
				Price = product.Price,
				Quantity = product.Quantity,
				Visibility = product.Visibility
			};
			ViewData["ProductId"] = id;
			return View(model);
		}

		[Authorize(Roles = "Admin,Warehouse")]
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Edit(Guid id, SaveProductResource model)
		{
			if (!ModelState.IsValid)
			{
				ViewData["ProductId"] = id;
				return View(model);
			}
			var product = await _productService.GetProductById(id);
			if (product == null) return NotFound();
			var updated = _mapper.ToDomain(model);
			await _productService.UpdateProduct(product, updated);
			return RedirectToAction(nameof(Index));
		}

		[Authorize(Roles = "Admin,Warehouse")]
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Delete(Guid id)
		{
			var product = await _productService.GetProductById(id);
			if (product == null) return NotFound();
			await _productService.DeleteProduct(product);
			return RedirectToAction(nameof(Index));
		}
	}
}
