using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOM.Core.Services;

namespace IOM.Tests.Integration
{
    /// <summary>
    /// Replaces SmtpEmailService in the integration-test hosts so tests can assert on the emails
    /// the API actually sends (recipient, subject, body). Shared by every test in the host, so
    /// tests should filter by their own unique recipient address via <see cref="To"/>.
    /// </summary>
    public class CapturingEmailService : IEmailService
    {
        public record SentEmail(string To, string Subject, string Body);

        private readonly ConcurrentQueue<SentEmail> _sent = new();

        public Task SendAsync(string to, string subject, string body)
        {
            _sent.Enqueue(new SentEmail(to, subject, body));
            return Task.CompletedTask;
        }

        public IReadOnlyList<SentEmail> To(string recipient)
            => _sent.Where(e => e.To == recipient).ToList();
    }
}
