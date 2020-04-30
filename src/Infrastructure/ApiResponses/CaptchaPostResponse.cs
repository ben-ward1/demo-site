using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Infrastructure.ApiResponses
{
    public class CaptchaPostResponse : IHttpResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("challenge_ts")]
        public DateTime ChallengeTimestamp { get; set; }

        [JsonProperty("hostname")]
        public string Hostname { get; set; }

        [JsonProperty("error-codes")]
        public IEnumerable<string> ErrorCodes { get; set; }
    }
}
