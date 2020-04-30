using Infrastructure.ApiClients;
using Infrastructure.ApiRequests;
using Infrastructure.ApiResponses;
using Infrastructure.Models.Enums;
using Newtonsoft.Json;
using System.Configuration;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class CaptchaController : Controller
    {
        private readonly CaptchaClient client = new CaptchaClient();

        [HttpPost]
        public ActionResult Verify(string token)
        {
            var response = client.VerifyCaptcha(token);
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }
    }
}