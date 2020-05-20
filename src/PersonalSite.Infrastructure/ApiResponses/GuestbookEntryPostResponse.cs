using Newtonsoft.Json;

namespace Infrastructure.ApiResponses
{
    public class GuestbookEntryPostResponse : IHttpResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
