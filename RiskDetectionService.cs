using GrtTorchBearer.Core.DTOs;
using GrtTorchBearer.Infrastructure.Data;

namespace GrtTorchBearer.Core.Services
{
    public class RiskDetectionService : IRiskDetectionService
    {
        private readonly GrtDbContext _dbContext;
        private readonly ILogger<RiskDetectionService> _logger;
        private readonly List<string> _restrictedCountries = new() { "KP", "IR", "SY", "CU" };

        public RiskDetectionService(GrtDbContext dbContext, ILogger<RiskDetectionService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<LoginRiskAssessmentDto> AssessLoginRiskAsync(LoginRiskRequest request)
        {
            try
            {
                var riskScore = 0;
                var riskFactors = new List<string>();

                // Check IP reputation
                if (IsIpBlacklisted(request.IpAddress))
                {
                    riskScore += 40;
                    riskFactors.Add("IP address blacklisted");
                }

                // Check geo-location
                if (await IsLocationRestrictedAsync(request.Country))
                {
                    riskScore += 50;
                    riskFactors.Add("Login from restricted country");
                }

                // Check device fingerprint
                var lastLogin = _dbContext.LoginLogs
                    .Where(l => l.UserId == request.UserId)
                    .OrderByDescending(l => l.LoginTime)
                    .FirstOrDefault();

                if (lastLogin != null && lastLogin.DeviceFingerprint != request.DeviceFingerprint)
                {
                    riskScore += 20;
                    riskFactors.Add("New device detected");
                }

                // Determine action
                string action = "ALLOW";
                if (riskScore >= 50)
                    action = "BLOCK";
                else if (riskScore >= 30)
                    action = "STEP_UP_VERIFICATION";

                return new LoginRiskAssessmentDto
                {
                    RiskScore = riskScore,
                    RiskLevel = riskScore >= 50 ? "HIGH" : riskScore >= 30 ? "MEDIUM" : "LOW",
                    Action = action,
                    RiskFactors = riskFactors,
                    AssessedAt = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Login risk assessment error");
                throw;
            }
        }

        public async Task<bool> IsLocationRestrictedAsync(string country)
        {
            return _restrictedCountries.Contains(country.ToUpper());
        }

        public async Task<AccountSecurityStatusDto> GetAccountSecurityStatusAsync(string userId)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            var loginAttempts = _dbContext.LoginLogs
                .Where(l => l.UserId == userId && l.LoginTime > DateTime.UtcNow.AddHours(-24))
                .Count();

            var status = "SECURE";
            var alerts = new List<string>();

            if (loginAttempts > 10)
            {
                status = "COMPROMISED";
                alerts.Add("Multiple login attempts detected");
            }

            if (!user.IsTwoFactorEnabled)
            {
                status = "AT_RISK";
                alerts.Add("2FA not enabled");
            }

            return new AccountSecurityStatusDto
            {
                UserId = userId,
                Status = status,
                LastLogin = _dbContext.LoginLogs
                    .Where(l => l.UserId == userId)
                    .OrderByDescending(l => l.LoginTime)
                    .FirstOrDefault()?.LoginTime,
                Alerts = alerts
            };
        }

        private bool IsIpBlacklisted(string ipAddress)
        {
            var blockedIps = new[] { "192.168.1.100", "10.0.0.1" };
            return blockedIps.Contains(ipAddress);
        }
    }
}