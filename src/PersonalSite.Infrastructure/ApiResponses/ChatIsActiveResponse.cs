using Newtonsoft.Json;

namespace Infrastructure.ApiResponses
{
    public class ChatIsActiveResponse : IHttpResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
