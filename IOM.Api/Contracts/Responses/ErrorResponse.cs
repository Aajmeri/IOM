using System.Collections.Generic;

namespace IOM.Api.Contracts.Responses
{
    public class ErrorResponse
    {
        public List<ErrorModel> Error { get; set; } = new List<ErrorModel>();
    }
}