namespace GrtTorchBearer.Core.DTOs
{
    public class LoginRiskRequest
    {
        public string UserId { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string DeviceFingerprint { get; set; } = string.Empty;
    }

    public class LoginRiskAssessmentDto
    {
        public int RiskScore { get; set; }
        public string RiskLevel { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty;
        public List<string> RiskFactors { get; set; } = new();
        public DateTime AssessedAt { get; set; }
    }

    public class AccountSecurityStatusDto
    {
        public string UserId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime? LastLogin { get; set; }
        public List<string> Alerts { get; set; } = new();
    }
}