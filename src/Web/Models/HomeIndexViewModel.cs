using System.Collections.Generic;
using Infrastructure.ApiResponses;
using Newtonsoft.Json;

namespace Web.Models
{
    public class HomeIndexViewModel
    {
        [JsonProperty("firstView")]
        public bool FirstView { get; set; }

        [JsonProperty("blog")]
        public IEnumerable<IMockBlogEntriesGetResponse> Blog { get; set; }
    }
}