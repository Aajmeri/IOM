using Microsoft.AspNetCore.Mvc;

namespace IOM.Api.Api.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
