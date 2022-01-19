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

namespace IOM.Api.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ItemController : Controller
	{
		private readonly ILogger<ItemController> _logger;
		private readonly IItemService _ItemService;
		private readonly  IMapper _mapper;

		public ItemController(ILogger<ItemController> logger, IItemService itemService
		, IMapper mapper)
		{
			_logger = logger;
			_ItemService = itemService;
			_mapper = mapper;
		}
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ItemResource>>> GetActive()
		{
			var items = await _ItemService.GetActive();
			var itemResource = _mapper.Map<IEnumerable<Item>, IEnumerable<ItemResource>>(items);
			return Ok(itemResource);
		}

		// [HttpGet("{id}")]
		// public async Task<ActionResult<IEnumerable<ItemResource>>> GetItemsByProductId(Guid id)
		// {
		// 	var Items = await _ItemService.GetItemsByProductId(id);
		// 	var ItemResource = _mapper.Map<IEnumerable<Item>, IEnumerable<ItemResource>>(Items);
		// 	return Ok(ItemResource);
		// }
		
		// public IActionResult Index()
		// {
		// 	return View(ItemResource);
		// }

		// [HttpGet]
		// public async Task<ActionResult<IEnumerable<ItemResource>>> Index()
		// {
		// 	var Items = await _ItemService.GetAllWithSupplierItem();
		// 	var ItemResources = _mapper.Map<IEnumerable<Item>, IEnumerable<ItemResource>>(Items);
		// 	return View(ItemResources);
		// }

		// [HttpGet("{id}")]
		// public async Task<ActionResult<ItemResource>> GetItemById(Guid id)
		// {
		// 	var Item = await _ItemService.GetItemById(id);
		// 	var ItemResource = _mapper.Map<Item, ItemResource>(Item);

		// 	return Ok(ItemResource);
		// }

		// [HttpPost("")]
		// public async Task<ActionResult<ItemResource>> CreateItem ([FromBody] SaveItemResource saveItemResource)
		// {
		// 	var ItemToCreate = _mapper.Map<SaveItemResource, Item>(saveItemResource);

		// 	var newItem = await _ItemService.CreateItem(ItemToCreate);

		// 	var Item = await _ItemService.GetItemById(newItem.Id);

		// 	var ItemResource = _mapper.Map<Item, ItemResource>(Item);

		// 	return Ok(ItemResource);
		// }

		// [HttpPut("{id}")]
		// public async Task<ActionResult<ItemResource>> UpdateItem (int id, [FromBody] SaveItemResource saveItemResource)
		// {

		// }
	}
}
