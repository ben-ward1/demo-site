using Infrastructure.ApiClients;
using Infrastructure.ApiRequests;
using Infrastructure.ApiResponses;
using Infrastructure.Models.Enums;
using Newtonsoft.Json;
using System.Configuration;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class GuestbookController : Controller
    {
        private readonly ApiClient client = new ApiClient(ConfigurationManager.AppSettings["ApiBaseUrl"]);

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
            var captchaClient = new CaptchaClient();
            
            if (captchaClient.VerifyCaptcha(request.Token).Success)
            {
                var response = client.AsyncRequest<GuestbookEntryPostResponse>("guestbook", request, HttpMethod.Post).Result;
                return Content(JsonConvert.SerializeObject(response), "application/json");
            }
            else
            {
                return Content(JsonConvert.SerializeObject(new { success = false }), "application/json");
            }
        }
    }
}