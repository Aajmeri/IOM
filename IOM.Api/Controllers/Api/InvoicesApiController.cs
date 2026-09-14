using System;
using System.Threading.Tasks;
using IOM.Api.Mapping;
using IOM.Api.Resources;
using IOM.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IOM.Api.Controllers.Api
{
    [ApiController]
    [Route("api/invoices")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class InvoicesApiController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;
        private readonly InvoiceMapper _mapper;

        public InvoicesApiController(IInvoiceService invoiceService, InvoiceMapper mapper)
        {
            _invoiceService = invoiceService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetAll()
        {
            var invoices = await _invoiceService.GetAllWithInvoiceSupplierAndInvoiceItems();
            return Ok(_mapper.ToResource(invoices));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var invoice = await _invoiceService.GetById(id);
            if (invoice == null) return NotFound();
            return Ok(_mapper.ToResource(invoice));
        }

        [HttpPost("upload")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] Guid supplierId, [FromForm] string invoiceNumber)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("A CSV file is required.");
            }

            using var stream = file.OpenReadStream();
            var uploadResult = await _invoiceService.UploadShippingOrder(supplierId, invoiceNumber, stream);
            var resource = _mapper.ToResource(uploadResult);

            if (uploadResult.InvoiceId == null)
            {
                return BadRequest(resource);
            }

            return Ok(resource);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var invoice = await _invoiceService.GetById(id);
            if (invoice == null) return NotFound();
            await _invoiceService.DeleteInvoice(invoice);
            return NoContent();
        }
    }
}
