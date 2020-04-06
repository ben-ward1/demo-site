using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.ApiClients
{
    public class MyApiClient
    {
        const string baseUrl = "http://localhost:81/api/";
        //static HttpClient client = new HttpClient();

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
    }
}
