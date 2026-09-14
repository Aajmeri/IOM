using System.Threading.Tasks;

namespace IOM.Core.Services
{
    public interface IEmailService
    {
        Task SendAsync(string to, string subject, string body);
    }
}
