using Infrastructure.ApiClients;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Web.Controllers
{
    public class CaptchaController : Controller
    {
        private readonly ICaptchaClient _client;

        public CaptchaController(ICaptchaClient client)
        {
            _client = client;
        }

        [HttpPost]
        public ActionResult Verify(string token)
        {
            var response = _client.VerifyCaptcha(token);
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }
    }
}