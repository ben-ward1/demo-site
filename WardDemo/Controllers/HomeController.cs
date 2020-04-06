using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Infrastructure.ApiClients;

namespace WardDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
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
            var response = MyApiClient.GetValueAsync().Result;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}