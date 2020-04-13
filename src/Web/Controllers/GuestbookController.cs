using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Infrastructure.ApiClients;

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
            var response = MockGetEntriesResponse();
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        private IEnumerable<GuestbookEntryResponse> MockGetEntriesResponse()
        {
            return new GuestbookEntryResponse[]
            {
                new GuestbookEntryResponse
                {
                    name = "Michael Scott",
                    message = "Don't ever, for any reason, do anything, to anyone, for any reason, ever, no matter what," +
                    " no matter where, or who, or who you are with, or where you are going, or where you've been, ever, " +
                    "for any reason whatsoever.",
                    date = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
                },
                new GuestbookEntryResponse
                {
                    name = "Dwight Schrute",
                    message = " I’m all about loyalty. In fact, I feel like part of what I’m being paid for here is my " +
                    "loyalty. But if there were somewhere else that valued loyalty more highly… I’m going wherever they " +
                    "value loyalty the most.",
                    date = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-ddTHH:mm:ssZ")
                }
            };
        }
    }

    public class GuestbookEntryResponse
    {
        public string name { get; set; }
        public string message { get; set; }
        public string date { get; set; }
    }
}