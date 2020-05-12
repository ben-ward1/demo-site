using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class DownloadsController : Controller
    {
        public ActionResult Resume()
        {
            return File(fileName: "../Content/pdf/wardResume2020-full.pdf", contentType: "application/pdf");
        }
    }
}