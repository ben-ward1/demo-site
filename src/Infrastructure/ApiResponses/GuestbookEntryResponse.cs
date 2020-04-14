using Newtonsoft.Json;
using System.Collections.Generic;

namespace Infrastructure.ApiResponses
{
    public class GuestbookEntryGetResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("entries")]
        public IEnumerable<GuestbookEntry> Entries { get; set; }
    }

    public class GuestbookEntry
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("date")]
        public string Date { get; set; }
    }
}
