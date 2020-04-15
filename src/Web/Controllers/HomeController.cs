using System.Web.Mvc;
using Infrastructure.ApiClients;
using Infrastructure.ApiResponses;
using Infrastructure.Models.Enums;
using Newtonsoft.Json;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "This is a demo site showing off some of the technologies I develop with. See below for more info.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public ActionResult Test()
        {
            var client = new ApiClient();
            var response = client.AsyncRequest<TestGetResponse>("test", null, HttpMethod.Get).Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }
    }
}