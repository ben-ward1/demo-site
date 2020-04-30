using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.ApiRequests
{
    public class CaptchaPostRequest : IHttpRequest
    {
        [JsonProperty("secret")]
        public string Secret { get; set; }

        [JsonProperty("response")]
        public string Response { get; set; }
    }
}
