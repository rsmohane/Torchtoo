using GrtTorchBearer.Core.DTOs;
using GrtTorchBearer.Infrastructure.Data;

namespace GrtTorchBearer.Core.Services
{
    public class SecureEmailService : ISecureEmailService
    {
        private readonly GrtDbContext _dbContext;
        private readonly ILogger<SecureEmailService> _logger;

        public SecureEmailService(GrtDbContext dbContext, ILogger<SecureEmailService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<SecureEmailDto> SendSecureEmailAsync(SendEmailRequest request)
        {
            try
            {
                var email = new SecureEmail
                {
                    Id = Guid.NewGuid().ToString(),
                    FromUserId = request.FromUserId,
                    ToEmail = request.ToEmail,
                    Subject = request.Subject,
                    Body = request.Body,
                    IsEncrypted = true,
                    SentAt = DateTime.UtcNow,
                    Status = "SENT"
                };

                _dbContext.SecureEmails.Add(email);
                await _dbContext.SaveChangesAsync();

                return new SecureEmailDto
                {
                    Id = email.Id,
                    FromUserId = email.FromUserId,
                    ToEmail = email.ToEmail,
                    Subject = email.Subject,
                    IsEncrypted = email.IsEncrypted,
                    SentAt = email.SentAt
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Secure email send error");
                throw;
            }
        }

        public async Task<SecureEmailDto> GetEmailAsync(string emailId)
        {
            var email = await _dbContext.SecureEmails.FindAsync(emailId);
            if (email == null)
                throw new Exception("Email not found");

            return new SecureEmailDto
            {
                Id = email.Id,
                FromUserId = email.FromUserId,
                ToEmail = email.ToEmail,
                Subject = email.Subject,
                IsEncrypted = email.IsEncrypted,
                SentAt = email.SentAt
            };
        }

        public async Task<bool> ArchiveEmailAsync(string emailId)
        {
            var email = await _dbContext.SecureEmails.FindAsync(emailId);
            if (email == null)
                throw new Exception("Email not found");

            email.Status = "ARCHIVED";
            _dbContext.SecureEmails.Update(email);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<EmailRiskAssessmentDto> AssessEmailRiskAsync(string emailContent)
        {
            var riskLevel = "LOW";
            var suspiciousPatterns = new List<string>();

            // Check for suspicious patterns
            if (emailContent.Contains("click here") || emailContent.Contains("verify account"))
                suspiciousPatterns.Add("Phishing keywords detected");

            if (emailContent.Contains("http://") && !emailContent.Contains("https://"))
                suspiciousPatterns.Add("Unencrypted links detected");

            if (suspiciousPatterns.Count > 2)
                riskLevel = "HIGH";
            else if (suspiciousPatterns.Count > 0)
                riskLevel = "MEDIUM";

            return new EmailRiskAssessmentDto
            {
                RiskLevel = riskLevel,
                SuspiciousPatterns = suspiciousPatterns,
                AssessedAt = DateTime.UtcNow
            };
        }
    }
}