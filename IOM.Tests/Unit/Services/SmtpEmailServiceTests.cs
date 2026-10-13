using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Service.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    /// <summary>
    /// The integration hosts swap SmtpEmailService for a capturing fake, so its own dev-mode
    /// behaviour (no SMTP host configured: log the email, don't send, don't throw) is covered here.
    /// </summary>
    public class SmtpEmailServiceTests
    {
        [Fact]
        public async Task SendAsync_NoSmtpHostConfigured_LogsTheFullEmailInsteadOfSending()
        {
            var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string>()).Build();
            var logger = new Mock<ILogger<SmtpEmailService>>();
            logger.Setup(l => l.IsEnabled(It.IsAny<LogLevel>())).Returns(true);
            var service = new SmtpEmailService(config, logger.Object);

            await service.SendAsync("jane@example.com", "Hello", "Body text");

            logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((state, _) =>
                    state.ToString().Contains("[DEV MODE — EMAIL NOT SENT]") &&
                    state.ToString().Contains("jane@example.com") &&
                    state.ToString().Contains("Hello") &&
                    state.ToString().Contains("Body text")),
                null,
                It.IsAny<System.Func<It.IsAnyType, System.Exception, string>>()), Times.Once);
        }
    }
}
