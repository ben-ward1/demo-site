using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class DownloadsController : Controller
    {
        public ActionResult Resume()
        {
            return File("~/Content/pdf/wardResume2020-full.pdf", "application/pdf");
        }
    }
}