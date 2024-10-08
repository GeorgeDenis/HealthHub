﻿namespace HealthHub.Application.Contracts.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
        Task SendEmailWithAttachmentAsync(string to, string subject, string body, MemoryStream attachmentStream, string attachmentFilename);
        Task SendEmailWithMultipleAttachmentAsync(string to, string subject, string body, MemoryStream attachmentStream, string attachmentFilename);
    }
}
