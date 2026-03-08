using GrtTorchBearer.Core.DTOs;

namespace GrtTorchBearer.Core.Services
{
    public interface ITrustEngineService
    {
        Task<TrustScoreDto> CalculateTrustScoreAsync(string userId);
        Task<TrustScoreDto> UpdateTrustScoreAsync(string userId);
        Task<bool> IsUserTrustworthyAsync(string userId);
    }
}