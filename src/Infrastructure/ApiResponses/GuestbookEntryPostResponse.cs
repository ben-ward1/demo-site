using Newtonsoft.Json;

namespace Infrastructure.ApiResponses
{
    public class GuestbookEntryPostResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
