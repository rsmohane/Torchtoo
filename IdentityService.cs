using GrtTorchBearer.Core.DTOs;
using GrtTorchBearer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GrtTorchBearer.Core.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly GrtDbContext _dbContext;
        private readonly ILogger<IdentityService> _logger;

        public IdentityService(GrtDbContext dbContext, ILogger<IdentityService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<KycVerificationResult> VerifyKycAsync(KycVerificationRequest request)
        {
            try
            {
                // Simulate KYC verification
                var verificationLevel = "VERIFIED";
                var trustScore = 75;

                var kycRecord = new KycVerification
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = request.UserId,
                    DocumentType = request.DocumentType,
                    DocumentNumber = request.DocumentNumber,
                    VerificationLevel = verificationLevel,
                    VerifiedAt = DateTime.UtcNow,
                    IsActive = true
                };

                _dbContext.KycVerifications.Add(kycRecord);

                // Update user trust score
                var user = await _dbContext.Users.FindAsync(request.UserId);
                if (user != null)
                {
                    user.TrustScore = trustScore;
                    user.IsKycVerified = true;
                }

                await _dbContext.SaveChangesAsync();

                return new KycVerificationResult
                {
                    IsVerified = true,
                    VerificationLevel = verificationLevel,
                    TrustScore = trustScore,
                    Message = "KYC verification successful"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "KYC verification error");
                throw;
            }
        }

        public async Task<ProfileDto> GetProfileAsync(string userId)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            return new ProfileDto
            {
                UserId = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                TrustScore = user.TrustScore,
                IsKycVerified = user.IsKycVerified,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<ProfileDto> UpdateProfileAsync(string userId, UpdateProfileRequest request)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            user.FullName = request.FullName ?? user.FullName;
            user.Profession = request.Profession;
            user.Location = request.Location;
            user.Bio = request.Bio;

            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();

            return new ProfileDto
            {
                UserId = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                TrustScore = user.TrustScore,
                IsKycVerified = user.IsKycVerified,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<DuplicateCheckResult> CheckDuplicateIdentityAsync(DuplicateCheckRequest request)
        {
            try
            {
                var duplicates = await _dbContext.Users
                    .Where(u => u.Email == request.Email || 
                                (u.PhoneNumber == request.PhoneNumber && !string.IsNullOrEmpty(request.PhoneNumber)))
                    .ToListAsync();

                return new DuplicateCheckResult
                {
                    HasDuplicates = duplicates.Count > 0,
                    DuplicateCount = duplicates.Count,
                    Message = duplicates.Count > 0 ? "Duplicate identities detected" : "No duplicates found"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Duplicate check error");
                throw;
            }
        }
    }
}