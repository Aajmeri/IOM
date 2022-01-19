using System.Net.Http;

namespace IOM.Api
{
    public class ApiHelper
    {
        public static HttpClient ApiClient { get; set; } = new HttpClient();
    }
}