using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;

namespace Web.Controllers
{
    public class SessionController : Controller
    {
        public ActionResult AcknowledgeNotification(bool acknowledged)
        {
            if (acknowledged)
            {
                // TODO : figure out how to update session here
                // Session["_InitialArrivalForSession"] = false;
                HttpContext.Session.SetString("acknowledged", "true");
            }
            else
            {
                throw new InvalidOperationException("Expected true for acknoledgement of notification.");
            }

            return Content(JsonConvert.SerializeObject(new { success = true }), "application/json");
        }
    }
}