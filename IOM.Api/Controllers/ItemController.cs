using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using IOM.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace IOM.Api.Controllers
{
    public class ItemController : Controller
    {
        // public IActionResult Index()
        // {
        // 	return View(ItemResource);
        // }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemResource>>> Index()
        {
            IEnumerable<ItemResource> items = new List<ItemResource>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:5001/api/Item"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    items = JsonConvert.DeserializeObject<IEnumerable<ItemResource>>(apiResponse);
                }
            }
            return View(items);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ItemResource>>> Index(Guid id)
        {
            IEnumerable<ItemResource> items = new List<ItemResource>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:5001/api/Item/" + id))
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        items = JsonConvert.DeserializeObject<IEnumerable<ItemResource>>(apiResponse);
                    }
                    else
                    {
                        ViewBag.StatusCode = response.StatusCode;
                    }
                }
                return View(items);
            }
        }
    }
}
