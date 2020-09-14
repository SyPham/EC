
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace EC_API.Helpers
{
    public interface IMailExtension
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task SendEmailRangeAsync(List<string> emails, string subject, string message);
        Task SendEmailRange(List<string> emails, string subject, string message);
    }
    public class MailExtension : IMailExtension
    {
        #region Feild
        private readonly IConfiguration _configuration;
        private delegate Task SendEmailDelegate(MailMessage m);
        #endregion

        #region Constructor
        public MailExtension(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        #endregion

        #region Helper Method
        public async Task SendEmail(MailMessage m)
        {
            await SendEmail(m, true);
        }
        public async Task SendEmail(MailMessage m, Boolean Async)
        {
            SmtpClient smtp = null;

            smtp = new SmtpClient(_configuration["MailSettings:Server"])
            {
                UseDefaultCredentials = bool.Parse(_configuration["MailSettings:UseDefaultCredentials"]),
                Port = int.Parse(_configuration["MailSettings:Port"]),
                EnableSsl = bool.Parse(_configuration["MailSettings:EnableSsl"]),
                Credentials = new NetworkCredential(_configuration["MailSettings:UserName"], _configuration["MailSettings:Password"])
            };
            smtp = new SmtpClient();

            if (Async)
            {
                SendEmailDelegate sd = new SendEmailDelegate(smtp.SendMailAsync);
                AsyncCallback cb = new AsyncCallback(SendEmailResponse);
                sd.BeginInvoke(m, cb, sd);
            }
            else
            {
                await smtp.SendMailAsync(m);
            }

        }
        private void SendEmailResponse(IAsyncResult ar)
        {
            SendEmailDelegate sd = (SendEmailDelegate)(ar.AsyncState);
            try
            {
                sd.EndInvoke(ar);

            }
            catch
            {
            }
        }
      
        #endregion

        #region Method

        public Task SendEmailRange(List<string> emails, string subject, string message)
        {
            SmtpClient client = new SmtpClient(_configuration["MailSettings:Server"])
            {

                UseDefaultCredentials = bool.Parse(_configuration["MailSettings:UseDefaultCredentials"]),
                Port = int.Parse(_configuration["MailSettings:Port"]),
                EnableSsl = bool.Parse(_configuration["MailSettings:EnableSsl"]),
                Credentials = new NetworkCredential(_configuration["MailSettings:UserName"], _configuration["MailSettings:Password"])
            };
            emails.Add(_configuration["MailSettings:TestEmail"].ToString());
            using MailMessage mailMessage = new MailMessage()
            {
                From = new MailAddress(_configuration["MailSettings:FromEmail"], _configuration["MailSettings:FromName"]),
                IsBodyHtml = true,
                Body = message,
                Subject = subject,
                Priority = MailPriority.High,
                BodyEncoding = System.Text.Encoding.UTF8
            };
            foreach (var email in emails)
            {
                mailMessage.To.Add(email);
            }
            try
            {
                client.Send(mailMessage);

            }
            catch
            {

            }
            return Task.CompletedTask;

        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            SmtpClient client = new SmtpClient(_configuration["MailSettings:Server"])
            {

                UseDefaultCredentials = bool.Parse(_configuration["MailSettings:UseDefaultCredentials"]),
                Port = int.Parse(_configuration["MailSettings:Port"]),
                EnableSsl = bool.Parse(_configuration["MailSettings:EnableSsl"]),
                Credentials = new NetworkCredential(_configuration["MailSettings:UserName"], _configuration["MailSettings:Password"])
            };

            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["MailSettings:FromEmail"], _configuration["MailSettings:FromName"]),
            };
            mailMessage.Body = message;
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Priority = MailPriority.High;
            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            try
            {
                client.Send(mailMessage);

            }
            catch 
            {

            }
            return Task.CompletedTask;
        }
        public Task SendEmailRangeAsync(List<string> emails, string subject, string message)
        {
            SmtpClient client = new SmtpClient(_configuration["MailSettings:Server"])
            {
                UseDefaultCredentials = bool.Parse(_configuration["MailSettings:UseDefaultCredentials"]),
                Port = int.Parse(_configuration["MailSettings:Port"]),
                EnableSsl = bool.Parse(_configuration["MailSettings:EnableSsl"]),
                Credentials = new NetworkCredential(_configuration["MailSettings:UserName"], _configuration["MailSettings:Password"])
            };
            emails.Add(_configuration["MailSettings:TestEmail"].ToString());
            using MailMessage mailMessage = new MailMessage()
            {
                From = new MailAddress(_configuration["MailSettings:FromEmail"], _configuration["MailSettings:FromName"]),
                IsBodyHtml = true,
                Body = message,
                Subject = subject,
                Priority = MailPriority.High,
                BodyEncoding = System.Text.Encoding.UTF8
            };
            foreach (var email in emails)
            {
                mailMessage.To.Add(email);
            }

            try
            {
                client.Send(mailMessage);

            }
            catch
            {

            }
            return Task.CompletedTask;
        }
        #endregion




    }
}
