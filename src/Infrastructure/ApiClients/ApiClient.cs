using System;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.ApiRequests;
using Infrastructure.ApiResponses;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using HttpMethod = Infrastructure.Models.Enums.HttpMethod;
using Newtonsoft.Json;

namespace Infrastructure.ApiClients
{
    public class ApiClient
    {
        private readonly string baseUrl = ConfigurationManager.AppSettings["ApiBaseUrl"];

        public async Task<T> AsyncRequest<T>(string url, IHttpRequest request, HttpMethod method) where T : IHttpResponse
        {
            if (method == HttpMethod.Get)
            {
                return await GetAsync<T>(url, request);
            }
            else if (method == HttpMethod.Post)
            {
                return await PostAsync<T>(url, request);
            }
            else
            {
                throw new NotImplementedException("Have only implemented GET and POST for now.");
            }
        }

        private async Task<T> GetAsync<T>(string url, IHttpRequest request)
        {
            using (var client = NewClient())
            {
                var getUrl = BuildGetUrl(url, request);

                var response = client.GetAsync(url).Result;

                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();

                var jsonResponse = JsonConvert.DeserializeObject<T>(result);

                return jsonResponse;
            }
        }

        private async Task<T> PostAsync<T>(string url, IHttpRequest request)
        {
            using (var client = NewClient())
            {
                var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                var response = client.PostAsync(url, content).Result;

                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();

                var jsonResponse = JsonConvert.DeserializeObject<T>(result);

                return jsonResponse;
            }
        }

        private HttpClient NewClient()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            return client;
        }

        private string BuildGetUrl(string url, IHttpRequest request)
        {
            if (request == null)
                return url;

            var getRequest = request as IHttpGetRequest;

            if (getRequest == null)
            {
                throw new InvalidOperationException("Object expected to be IHttpGetRequest");
            }

            return url + getRequest.ToQueryString();
        }
    }
}
