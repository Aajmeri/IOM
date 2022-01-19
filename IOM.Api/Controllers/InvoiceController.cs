using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using IOM.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace IOM.Api.Controllers
{
    public class InvoiceController : Controller
    {

        // public IActionResult Index()
        // {
        // 	return View(InvoiceResource);
        // }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceResource>>> Index()
        {
            IEnumerable<InvoiceResource> Invoices = new List<InvoiceResource>();
            using (var httpClient = new HttpClient())
            {
                using var response = await httpClient.GetAsync("https://localhost:5001/api/Invoice");
                string apiResponse = await response.Content.ReadAsStringAsync();
                Invoices = JsonConvert.DeserializeObject<IEnumerable<InvoiceResource>>(apiResponse);
            }

            return View(Invoices);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<InvoiceResource>>> Index(Guid id)
        {
            IEnumerable<InvoiceResource> Invoices = new List<InvoiceResource>();
            using var httpClient = new HttpClient();
            using (var response = await httpClient.GetAsync("https://localhost:5001/api/Invoice/" + id))
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Invoices = JsonConvert.DeserializeObject<IEnumerable<InvoiceResource>>(apiResponse);
                }
                else
                {
                    ViewBag.StatusCode = response.StatusCode;
                }
            }
            return View(Invoices);
        }
    }
}
