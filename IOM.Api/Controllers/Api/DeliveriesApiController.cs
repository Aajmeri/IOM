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
    [Route("api/deliveries")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DeliveriesApiController : ControllerBase
    {
        private readonly IDeliveryService _deliveryService;
        private readonly DeliveryMapper _mapper;

        public DeliveriesApiController(IDeliveryService deliveryService, DeliveryMapper mapper)
        {
            _deliveryService = deliveryService;
            _mapper = mapper;
        }

        [HttpGet("search")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Search(
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to,
            [FromQuery] Guid? supplierId,
            [FromQuery] string status,
            [FromQuery] string keyword)
        {
            DeliveryStatus? parsedStatus = null;
            if (!string.IsNullOrWhiteSpace(status))
            {
                if (!Enum.TryParse<DeliveryStatus>(status, true, out var statusValue))
                {
                    return BadRequest($"Status must be one of: {string.Join(", ", Enum.GetNames(typeof(DeliveryStatus)))}");
                }
                parsedStatus = statusValue;
            }

            var deliveries = await _deliveryService.Search(from, to, supplierId, parsedStatus, keyword);
            return Ok(_mapper.ToResource(deliveries));
        }

        [HttpGet("calendar")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Calendar([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            var deliveries = await _deliveryService.GetByDateRange(start, end);
            return Ok(_mapper.ToResource(deliveries));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var delivery = await _deliveryService.GetById(id);
            if (delivery == null) return NotFound();
            return Ok(_mapper.ToResource(delivery));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Create([FromBody] SaveDeliveryResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var delivery = _mapper.ToDomain(model);
            var created = await _deliveryService.CreateDelivery(delivery);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, _mapper.ToResource(created));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SaveDeliveryResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var delivery = await _deliveryService.GetById(id);
            if (delivery == null) return NotFound();
            var updated = _mapper.ToDomain(model);
            await _deliveryService.UpdateDelivery(delivery, updated);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var delivery = await _deliveryService.GetById(id);
            if (delivery == null) return NotFound();
            await _deliveryService.DeleteDelivery(delivery);
            return NoContent();
        }
    }
}
