using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class SessionController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AcknowledgeNotification(bool acknowledged)
        {
            if (acknowledged)
            {
                Session["_InitialArrivalForSession"] = false;
                
            }
            else
            {
                throw new InvalidOperationException("Expected true for acknoledgement of notification.");
            }

            return Content(JsonConvert.SerializeObject(new { success = true }), "application/json");
        }
    }
}