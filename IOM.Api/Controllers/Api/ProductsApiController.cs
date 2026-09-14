using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOM.Api.Mapping;
using IOM.Api.Resources;
using IOM.Core.Models;
using IOM.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IOM.Api.Controllers.Api
{
    [ApiController]
    [Route("api/products")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProductsApiController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ProductMapper _mapper;

        public ProductsApiController(IProductService productService, ProductMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllWithSupplierProduct();

            // Clients get a reduced, supplier-free shape and only ever see visible products.
            if (User.IsInRole("Client"))
            {
                var visibleProducts = products.Where(p => p.Visibility);
                return Ok(_mapper.ToClientResource(visibleProducts));
            }

            return Ok(_mapper.ToResource(products));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null) return NotFound();

            if (User.IsInRole("Client"))
            {
                if (!product.Visibility) return NotFound();
                return Ok(_mapper.ToClientResource(product));
            }

            return Ok(_mapper.ToResource(product));
        }

        [HttpGet("by-barcode/{barcode}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetByBarcode(string barcode)
        {
            var product = await _productService.GetByBarcode(barcode);
            if (product == null) return NotFound();
            return Ok(_mapper.ToResource(product));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Create([FromBody] SaveProductResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!string.IsNullOrWhiteSpace(model.Barcode))
            {
                var existingByBarcode = await _productService.GetByBarcode(model.Barcode);
                if (existingByBarcode != null)
                    return BadRequest(new { message = "Barcode is already in use by another product." });
            }
            var product = _mapper.ToDomain(model);
            product.SupplierProduct = new List<SupplierProduct>
            {
                new SupplierProduct { SupplierId = model.SupplierId }
            };
            var created = await _productService.CreateProduct(product);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, _mapper.ToResource(created));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SaveProductResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var product = await _productService.GetProductById(id);
            if (product == null) return NotFound();
            if (!string.IsNullOrWhiteSpace(model.Barcode))
            {
                var existingByBarcode = await _productService.GetByBarcode(model.Barcode);
                if (existingByBarcode != null && existingByBarcode.Id != id)
                    return BadRequest(new { message = "Barcode is already in use by another product." });
            }
            var updated = _mapper.ToDomain(model);
            // Replace the product's supplier link with exactly one entry for the given SupplierId
            // (SupplierProduct stays a many-to-many join table, but is treated as single-primary-
            // supplier from the UI/API's perspective).
            updated.SupplierProduct = new List<SupplierProduct>
            {
                new SupplierProduct { SupplierId = model.SupplierId, ProductId = id }
            };
            await _productService.UpdateProduct(product, updated);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null) return NotFound();
            await _productService.DeleteProduct(product);
            return NoContent();
        }
    }
}
