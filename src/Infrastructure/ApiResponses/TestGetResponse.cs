using Newtonsoft.Json;

namespace Infrastructure.ApiResponses
{
    public class TestGetResponse : IHttpResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
