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
	public class InvoiceController : Controller
	{
		private readonly ILogger<InvoiceController> _logger;
		private readonly IInvoiceService _invoiceService;
		private readonly  IMapper _mapper;

		public InvoiceController(ILogger<InvoiceController> logger, IInvoiceService invoiceService
		, IMapper mapper)
		{
			_logger = logger;
			_invoiceService = invoiceService;
			_mapper = mapper;
		}
		[HttpGet]
		public async Task<ActionResult<IEnumerable<InvoiceResource>>> GetActive()
		{
			var invoice = await _invoiceService.GetAllWithInvoiceSupplierAndInvoiceItems();
			var invoiceResource = _mapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceResource>>(invoice);
			return Ok(invoiceResource);
		}

		// [HttpGet("{id}")]
		// public async Task<ActionResult<IEnumerable<InvoiceResource>>> GetInvoicesByProductId(Guid id)
		// {
		// 	var invoice = await _itemService.GetInvoicesByProductId(id);
		// 	var itemResource = _mapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceResource>>(invoice);
		// 	return Ok(itemResource);
		// }
		
		// public IActionResult Index()
		// {
		// 	return View(InvoiceResource);
		// }

		// [HttpGet]
		// public async Task<ActionResult<IEnumerable<InvoiceResource>>> Index()
		// {
		// 	var invoice = await _itemService.GetAllWithSupplierInvoice();
		// 	var itemResources = _mapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceResource>>(invoice);
		// 	return View(itemResources);
		// }

		// [HttpGet("{id}")]
		// public async Task<ActionResult<InvoiceResource>> GetInvoiceById(Guid id)
		// {
		// 	var item = await _itemService.GetInvoiceById(id);
		// 	var itemResource = _mapper.Map<Invoice, InvoiceResource>(item);

		// 	return Ok(itemResource);
		// }

		// [HttpPost("")]
		// public async Task<ActionResult<InvoiceResource>> CreateInvoice ([FromBody] SaveInvoiceResource saveInvoiceResource)
		// {
		// 	var itemToCreate = _mapper.Map<SaveInvoiceResource, Invoice>(saveInvoiceResource);

		// 	var newInvoice = await _itemService.CreateInvoice(itemToCreate);

		// 	var item = await _itemService.GetInvoiceById(newInvoice.Id);

		// 	var itemResource = _mapper.Map<Invoice, InvoiceResource>(item);

		// 	return Ok(itemResource);
		// }

		// [HttpPut("{id}")]
		// public async Task<ActionResult<InvoiceResource>> UpdateInvoice (int id, [FromBody] SaveInvoiceResource saveInvoiceResource)
		// {

		// }
	}
}
