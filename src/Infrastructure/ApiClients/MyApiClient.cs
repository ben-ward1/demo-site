using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Infrastructure.ApiResponses;
using Infrastructure.ApiRequests;
using System.Text;

namespace Infrastructure.ApiClients
{
    public class MyApiClient
    {
        const string baseUrl = "http://localhost:81/api/";

        public static async Task<string> GetValueAsync()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                var response = client.GetAsync("values/5").Result;

                response.EnsureSuccessStatusCode();

                return await response.Content.ReadAsStringAsync();
            }
        }

        public static async Task<GuestbookEntryPostResponse> PostAsync(GuestbookEntryPostRequest request)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                var response = client.PostAsync("guestbook", content).Result;

                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();

                var jsonResponse = JsonConvert.DeserializeObject<GuestbookEntryPostResponse>(result);

                return jsonResponse;
            }
        }

        public static async Task<GuestbookEntryGetResponse> GetAsync()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var response = client.GetAsync("guestbook").Result;

                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();

                var jsonResponse = JsonConvert.DeserializeObject<GuestbookEntryGetResponse>(result);

                return jsonResponse;
            }
        }
    }
}
