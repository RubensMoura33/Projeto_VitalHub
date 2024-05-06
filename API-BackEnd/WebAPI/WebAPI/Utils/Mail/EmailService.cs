
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.AspNetCore.Http.HttpResults;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //variavel privada com as configs do email
        private readonly EmailSettings emailSettings;

        public EmailService(IOptions<EmailSettings> options)
        {
            //obtem as configs do email e armazena na variavel privada
            emailSettings = options.Value;
        }
        public async Task SendEmailAsync(MailRequest request)
        {
            try
            {
                //objeto que representa o email
                var email = new MimeMessage();

                //define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //adiciona o destinatario do email
                email.To.Add(MailboxAddress.Parse(request.ToEmail));

                email.Subject = request.Subject;

                var builder = new BodyBuilder();
                builder.HtmlBody = request.Body;
                email.Body = builder.ToMessageBody();

                using(var smtp = new SmtpClient()) 
                {
                    //conecta-se ao servidor SMTP usando os dados do emailSettings
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //envia o e-mail assincrono
                    await smtp.SendAsync(email);
                }

            }
            catch (Exception ex)
            {
             
            }
        }
    }
}
