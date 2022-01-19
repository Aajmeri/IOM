using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using IOM.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace IOM.Api.Controllers
{
    public class ProductController : Controller
	{

		// public IActionResult Index()
		// {
		// 	return View(ProductResource);
		// }

		public async Task<ActionResult<IEnumerable<ProductResource>>> Index()
		{
			IEnumerable<ProductResource> products = new List<ProductResource>();
			 using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:5001/api/Product"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    products  = JsonConvert.DeserializeObject<IEnumerable<ProductResource>>(apiResponse);
                }
            }
            return View(products);
		}
	}
}
