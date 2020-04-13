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
        [HttpGet]
        public ActionResult GetEntries()
        {
            var response = MockGetEntriesResponse();
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        //public ActionResult PostEntry()
        //{
        //    var
        //}

        private IEnumerable<GuestbookEntry> MockGetEntriesResponse()
        {
            return new GuestbookEntry[]
            {
                new GuestbookEntry
                {
                    Name = "Michael Scott",
                    Message = "Don't ever, for any reason, do anything, to anyone, for any reason, ever, no matter what," +
                    " no matter where, or who, or who you are with, or where you are going, or where you've been, ever, " +
                    "for any reason whatsoever.",
                    Date = DateTime.Now.AddDays(-1)
                },
                new GuestbookEntry
                {
                    Name = "Dwight Schrute",
                    Message = " I’m all about loyalty. In fact, I feel like part of what I’m being paid for here is my " +
                    "loyalty. But if there were somewhere else that valued loyalty more highly… I’m going wherever they " +
                    "value loyalty the most.",
                    Date = DateTime.Now.AddDays(-1)
                }
            };
        }
    }

    public class GuestbookEntry
    {
        public string Name { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}