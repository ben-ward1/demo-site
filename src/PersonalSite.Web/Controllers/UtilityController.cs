using Infrastructure.ApiClients;
using Infrastructure.ApiResponses;
using Infrastructure.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PersonalSite.Web.Controllers
{
    public class UtilityController : Controller
    {
        private readonly IApiClient _client;

        public UtilityController(IApiClient client)
        {
            _client = client;
        }

        public ActionResult IsChatActive()
        {
            var response = _client.AsyncRequest<ChatIsActiveResponse>("global/chatisactive", null, HttpMethod.Get).Result;
            return Content(JsonConvert.SerializeObject(response), "application/json");
        }
    }
}