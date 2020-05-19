using Infrastructure.ApiRequests;
using Infrastructure.ApiResponses;
using System.Net;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using PersonalSite.Infrastructure.Models;

namespace Infrastructure.ApiClients
{
    public interface ICaptchaClient
    {
        public CaptchaPostResponse VerifyCaptcha(string token);
    }

    public class CaptchaClient : ICaptchaClient
    {
        private readonly string url;
        private readonly string key;

        public CaptchaClient(IOptions<Settings> settings)
        {
            url = settings.Value.CaptchaUrl;
            key = settings.Value.CaptchaSecretKey;
        }

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
