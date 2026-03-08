using GrtTorchBearer.Core.DTOs;

namespace GrtTorchBearer.Core.Services
{
    public interface IVaultService
    {
        Task<VaultItemDto> StoreSecretAsync(string userId, string key, string value);
        Task<string> RetrieveSecretAsync(string userId, string key);
        Task<bool> DeleteSecretAsync(string userId, string key);
        Task<List<VaultItemDto>> ListSecretsAsync(string userId);
    }
}