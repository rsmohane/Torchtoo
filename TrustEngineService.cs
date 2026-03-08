using GrtTorchBearer.Core.DTOs;
using GrtTorchBearer.Infrastructure.Data;

namespace GrtTorchBearer.Core.Services
{
    public class TrustEngineService : ITrustEngineService
    {
        private readonly GrtDbContext _dbContext;
        private readonly ILogger<TrustEngineService> _logger;

        public TrustEngineService(GrtDbContext dbContext, ILogger<TrustEngineService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<TrustScoreDto> CalculateTrustScoreAsync(string userId)
        {
            try
            {
                var user = await _dbContext.Users.FindAsync(userId);
                if (user == null)
                    throw new Exception("User not found");

                var score = 0;
                var factors = new List<string>();

                // KYC verification (30 points)
                if (user.IsKycVerified)
                {
                    score += 30;
                    factors.Add("KYC Verified");
                }

                // Account age (20 points)
                var accountAge = DateTime.UtcNow - user.CreatedAt;
                if (accountAge.TotalDays > 90)
                {
                    score += 20;
                    factors.Add("Account 90+ days old");
                }

                // Login consistency (20 points)
                var recentLogins = _dbContext.LoginLogs.Where(l => l.UserId == userId && l.LoginTime > DateTime.UtcNow.AddDays(-30)).Count();
                if (recentLogins > 5)
                {
                    score += 20;
                    factors.Add("Consistent login pattern");
                }

                // Email verification (15 points)
                if (user.IsEmailVerified)
                {
                    score += 15;
                    factors.Add("Email verified");
                }

                // No complaints (15 points)
                var complaints = _dbContext.Complaints.Where(c => c.UserId == userId).Count();
                if (complaints == 0)
                {
                    score += 15;
                    factors.Add("No complaints");
                }

                return new TrustScoreDto
                {
                    UserId = userId,
                    Score = score,
                    Level = score >= 80 ? "EXCELLENT" : score >= 60 ? "GOOD" : score >= 40 ? "FAIR" : "POOR",
                    Factors = factors,
                    LastUpdated = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Trust score calculation error");
                throw;
            }
        }

        public async Task<TrustScoreDto> UpdateTrustScoreAsync(string userId)
        {
            var trustScore = await CalculateTrustScoreAsync(userId);
            var user = await _dbContext.Users.FindAsync(userId);
            if (user != null)
            {
                user.TrustScore = trustScore.Score;
                _dbContext.Users.Update(user);
                await _dbContext.SaveChangesAsync();
            }
            return trustScore;
        }

        public async Task<bool> IsUserTrustworthyAsync(string userId)
        {
            var trustScore = await CalculateTrustScoreAsync(userId);
            return trustScore.Score >= 60;
        }
    }
}