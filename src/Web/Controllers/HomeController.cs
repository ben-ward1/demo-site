using System.Web.Mvc;
using Infrastructure.ApiClients;
using Infrastructure.ApiResponses;
using Infrastructure.Models.Enums;
using Infrastructure.Helpers;
using Newtonsoft.Json;
using Web.Models;
using System.Configuration;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var isInitialArrivalForSession = Session["_InitialArrivalForSession"];

            var firstVisit = isInitialArrivalForSession;
            var blog = BlogMocker.MockBlog();

            var viewModel = new HomeIndexViewModel
            {
                FirstView = (bool)firstVisit,
                Blog = blog,
                CaptchaKey = ConfigurationManager.AppSettings["CaptchaSiteKey"]
            };

            return View(model: viewModel.ToIdiomaticJson());
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
            var client = new ApiClient(ConfigurationManager.AppSettings["ApiBaseUrl"]);
            var response = client.AsyncRequest<TestGetResponse>("test", null, HttpMethod.Get).Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }
    }
}