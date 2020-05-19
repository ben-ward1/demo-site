using Newtonsoft.Json;

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
