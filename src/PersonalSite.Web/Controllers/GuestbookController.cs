using Infrastructure.ApiClients;
using Infrastructure.ApiRequests;
using Infrastructure.ApiResponses;
using Infrastructure.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PersonalSite.Infrastructure.Models;

namespace Web.Controllers
{
    public class GuestbookController : Controller
    {
        private readonly IApiClient _apiClient;
        private readonly ICaptchaClient _captchaClient;

        public GuestbookController(IOptions<Settings> settings, ICaptchaClient captchaClient, IApiClient apiClient)
        {
            _apiClient = apiClient;
            _captchaClient = captchaClient;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetEntries()
        {
            var response = _apiClient.AsyncRequest<GuestbookEntryGetResponse>("guestbook", null, HttpMethod.Get).Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }

        [HttpPost]
        public ActionResult PostEntry(GuestbookEntryPostRequest request)
        {
            if (_captchaClient.VerifyCaptcha(request.Token).Success)
            {
                var response = _apiClient.AsyncRequest<GuestbookEntryPostResponse>("guestbook", request, HttpMethod.Post).Result;
                return Content(JsonConvert.SerializeObject(response), "application/json");
            }
            else
            {
                return Content(JsonConvert.SerializeObject(new { success = false }), "application/json");
            }
        }
    }
}