using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalSite.Infrastructure.Models
{
    public class Settings
    {
        public string ApiBaseUrl { get; set; }
        public string CaptchaUrl { get; set; }
        public string CaptchaSiteKey { get; set; }
        public string CaptchaSecretKey { get; set; }
        public string ChatModKey { get; set; }
    }
}
