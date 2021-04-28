using Microsoft.AspNetCore.Mvc;

namespace IOM.Api.Controllers
{

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
