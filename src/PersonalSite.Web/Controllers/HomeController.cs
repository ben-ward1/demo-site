using Infrastructure.ApiClients;
using Infrastructure.ApiResponses;
using Infrastructure.Models.Enums;
using Infrastructure.Helpers;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using PersonalSite.Infrastructure.Models;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IOptions<Settings> _settings;
        private readonly IApiClient _client;

        public HomeController(IOptions<Settings> settings, IApiClient client)
        {
            _settings = settings;
            _client = client;
        }

        public ActionResult Index()
        {
            var showNotification = HttpContext.Session.GetString("acknowledged") == null;

            var blog = BlogMocker.MockBlog();

            var viewModel = new HomeIndexViewModel
            {
                FirstView = showNotification,
                Blog = blog,
                CaptchaKey = _settings.Value.CaptchaSiteKey,
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
            var response = _client.AsyncRequest<TestGetResponse>("test", null, HttpMethod.Get).Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }
    }
}