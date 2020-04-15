using Infrastructure.ApiClients;
using Infrastructure.ApiRequests;
using Infrastructure.ApiResponses;
using Infrastructure.Models.Enums;
using Newtonsoft.Json;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class GuestbookController : Controller
    {
        private readonly ApiClient client = new ApiClient();

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetEntries()
        {
            var response = client.AsyncRequest<GuestbookEntryGetResponse>("guestbook", null, HttpMethod.Get).Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }

        [HttpPost]
        public ActionResult PostEntry(GuestbookEntryPostRequest request)
        {
            var response = client.AsyncRequest<GuestbookEntryPostResponse>("guestbook", request, HttpMethod.Post).Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }
    }
}