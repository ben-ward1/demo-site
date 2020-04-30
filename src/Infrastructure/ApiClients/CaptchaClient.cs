using Infrastructure.ApiRequests;
using Infrastructure.ApiResponses;
using System.Configuration;
using System.Net;
using Newtonsoft.Json;

namespace Infrastructure.ApiClients
{
    public class CaptchaClient
    {
        private readonly string url = ConfigurationManager.AppSettings["CaptchaUrl"];
        private readonly string key = ConfigurationManager.AppSettings["CaptchaSecretKey"];

        public CaptchaPostResponse VerifyCaptcha(string token)
        {
            var request = new CaptchaPostRequest
            {
                Secret = key,
                Response = token
            };

            using (var client = new WebClient())
            {
                var requestUrl = BuildUrl(request);
                var response = client.DownloadString(requestUrl);

                var captchaResponse = JsonConvert.DeserializeObject<CaptchaPostResponse>(response);
                return captchaResponse;
            }
        }

        private string BuildUrl(CaptchaPostRequest request)
        {
            var query = $"?secret={request.Secret}&response={request.Response}";
            return url + query;
        }
    }
}
