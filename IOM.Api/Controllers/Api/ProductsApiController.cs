using System;
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
            return Ok(_mapper.ToResource(products));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null) return NotFound();
            return Ok(_mapper.ToResource(product));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Create([FromBody] SaveProductResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var product = _mapper.ToDomain(model);
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
            var updated = _mapper.ToDomain(model);
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
