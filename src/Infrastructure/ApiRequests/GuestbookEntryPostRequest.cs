using Newtonsoft.Json;

namespace Infrastructure.ApiRequests
{
    public class GuestbookEntryPostRequest : IHttpRequest
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
