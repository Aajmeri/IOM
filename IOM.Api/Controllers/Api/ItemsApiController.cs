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
    [Route("api/items")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ItemsApiController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly ItemMapper _mapper;

        public ItemsApiController(IItemService itemService, ItemMapper mapper)
        {
            _itemService = itemService;
            _mapper = mapper;
        }

        [HttpGet("by-product/{productId}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetByProduct(Guid productId)
        {
            var items = await _itemService.GetItemsByProductId(productId);
            return Ok(_mapper.ToResource(items));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var item = await _itemService.GetItemById(id);
            if (item == null) return NotFound();
            return Ok(_mapper.ToResource(item));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Create([FromBody] SaveItemResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var item = _mapper.ToDomain(model);
            var created = await _itemService.CreateItem(item);
            var withProduct = await _itemService.GetItemById(created.Id);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, _mapper.ToResource(withProduct));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SaveItemResource model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var item = await _itemService.GetItemById(id);
            if (item == null) return NotFound();
            var updated = _mapper.ToDomain(model);
            await _itemService.UpdateItem(item, updated);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Warehouse")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var item = await _itemService.GetItemById(id);
            if (item == null) return NotFound();
            await _itemService.DeleteItem(item);
            return NoContent();
        }
    }
}
