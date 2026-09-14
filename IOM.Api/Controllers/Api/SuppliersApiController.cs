using System;
using System.Threading.Tasks;
using IOM.Api.Mapping;
using IOM.Api.Resources;
using IOM.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IOM.Api.Controllers.Api
{
    [ApiController]
    [Route("api/suppliers")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SuppliersApiController : ControllerBase
    {
        private readonly ISupplierService _supplierService;
        private readonly SupplierMapper _mapper;

        public SuppliersApiController(ISupplierService supplierService, SupplierMapper mapper)
        {
            _supplierService = supplierService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetAll()
        {
            var suppliers = await _supplierService.GetAllWithInvoiceSupplierAndSupplierProduct();
            return Ok(_mapper.ToResource(suppliers));
        }

        [HttpGet("search")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] int limit = 20)
        {
            var suppliers = await _supplierService.Search(query, limit);
            return Ok(_mapper.ToResource(suppliers));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var supplier = await _supplierService.GetById(id);
            if (supplier == null) return NotFound();
            return Ok(_mapper.ToResource(supplier));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Create([FromBody] SaveSupplierResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var supplier = _mapper.ToDomain(model);
            var created = await _supplierService.CreateSupplier(supplier);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, _mapper.ToResource(created));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SaveSupplierResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var supplier = await _supplierService.GetById(id);
            if (supplier == null) return NotFound();
            var updated = _mapper.ToDomain(model);
            await _supplierService.UpdateSupplier(supplier, updated);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var supplier = await _supplierService.GetById(id);
            if (supplier == null) return NotFound();
            await _supplierService.DeleteSupplier(supplier);
            return NoContent();
        }
    }
}
