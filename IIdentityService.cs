using GrtTorchBearer.Core.DTOs;

namespace GrtTorchBearer.Core.Services
{
    public interface IIdentityService
    {
        Task<KycVerificationResult> VerifyKycAsync(KycVerificationRequest request);
        Task<ProfileDto> GetProfileAsync(string userId);
        Task<ProfileDto> UpdateProfileAsync(string userId, UpdateProfileRequest request);
        Task<DuplicateCheckResult> CheckDuplicateIdentityAsync(DuplicateCheckRequest request);
    }
}