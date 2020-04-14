using Infrastructure.ApiClients;
using Infrastructure.ApiRequests;
using Newtonsoft.Json;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class GuestbookController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetEntries()
        {
            var response = MyApiClient.GetAsync().Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }

        [HttpPost]
        public ActionResult PostEntry(GuestbookEntryPostRequest request)
        {
            var response = MyApiClient.PostAsync(request).Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }
    }
}