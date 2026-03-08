using GrtTorchBearer.Core.DTOs;

namespace GrtTorchBearer.Core.Services
{
    public interface IRiskDetectionService
    {
        Task<LoginRiskAssessmentDto> AssessLoginRiskAsync(LoginRiskRequest request);
        Task<bool> IsLocationRestrictedAsync(string country);
        Task<AccountSecurityStatusDto> GetAccountSecurityStatusAsync(string userId);
    }
}