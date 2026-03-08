namespace GrtTorchBearer.Core.DTOs
{
    public class KycVerificationRequest
    {
        public string UserId { get; set; } = string.Empty;
        public string DocumentType { get; set; } = string.Empty;
        public string DocumentNumber { get; set; } = string.Empty;
    }

    public class KycVerificationResult
    {
        public bool IsVerified { get; set; }
        public string VerificationLevel { get; set; } = string.Empty;
        public int TrustScore { get; set; }
        public string Message { get; set; } = string.Empty;
    }

    public class ProfileDto
    {
        public string UserId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public int TrustScore { get; set; }
        public bool IsKycVerified { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class UpdateProfileRequest
    {
        public string? FullName { get; set; }
        public string? Profession { get; set; }
        public string? Location { get; set; }
        public string? Bio { get; set; }
    }

    public class DuplicateCheckRequest
    {
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
    }

    public class DuplicateCheckResult
    {
        public bool HasDuplicates { get; set; }
        public int DuplicateCount { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}