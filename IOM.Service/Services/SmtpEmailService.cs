using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using IOM.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace IOM.Service.Services
{
    public class SmtpEmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<SmtpEmailService> _logger;

        public SmtpEmailService(IConfiguration configuration, ILogger<SmtpEmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendAsync(string to, string subject, string body)
        {
            var smtpHost = _configuration["Email:SmtpHost"];

            if (string.IsNullOrWhiteSpace(smtpHost))
            {
                // No real SMTP server configured (the default for this dev environment) -
                // log the full would-be email instead of attempting to send it.
                _logger.LogInformation(
                    "[DEV MODE — EMAIL NOT SENT] To: {To} | Subject: {Subject}\n{Body}",
                    to, subject, body);
                return;
            }

            var smtpPort = int.TryParse(_configuration["Email:SmtpPort"], out var port) ? port : 587;
            var username = _configuration["Email:Username"];
            var password = _configuration["Email:Password"];
            var from = _configuration["Email:From"];
            if (string.IsNullOrWhiteSpace(from)) from = username;

            using var client = new SmtpClient(smtpHost, smtpPort);
            if (!string.IsNullOrWhiteSpace(username))
            {
                client.Credentials = new NetworkCredential(username, password);
            }
            client.EnableSsl = true;

            using var message = new MailMessage(from, to, subject, body);
            await client.SendMailAsync(message);
        }
    }
}
