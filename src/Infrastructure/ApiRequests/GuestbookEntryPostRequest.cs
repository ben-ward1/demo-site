using Newtonsoft.Json;

namespace Infrastructure.ApiRequests
{
    public class GuestbookEntryPostRequest
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
