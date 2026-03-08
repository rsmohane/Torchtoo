namespace GrtTorchBearer.Core.DTOs
{
    public class SendEmailRequest
    {
        public string FromUserId { get; set; } = string.Empty;
        public string ToEmail { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }

    public class SecureEmailDto
    {
        public string Id { get; set; } = string.Empty;
        public string FromUserId { get; set; } = string.Empty;
        public string ToEmail { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public bool IsEncrypted { get; set; }
        public DateTime SentAt { get; set; }
    }

    public class EmailRiskAssessmentDto
    {
        public string RiskLevel { get; set; } = string.Empty;
        public List<string> SuspiciousPatterns { get; set; } = new();
        public DateTime AssessedAt { get; set; }
    }
}