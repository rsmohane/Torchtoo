using GrtTorchBearer.Core.DTOs;
using GrtTorchBearer.Infrastructure.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GrtTorchBearer.Core.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly GrtDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthenticationService> _logger;

        public AuthenticationService(GrtDbContext dbContext, IConfiguration configuration, ILogger<AuthenticationService> logger)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<object> RegisterAsync(RegisterRequest request)
        {
            try
            {
                // Hash password
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

                // Create user
                var user = new User
                {
                    Id = Guid.NewGuid().ToString(),
                    Email = request.Email,
                    FullName = request.FullName,
                    PasswordHash = hashedPassword,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true,
                    TrustScore = 0
                };

                _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync();

                return new { UserId = user.Id, Email = user.Email };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Registration error");
                throw;
            }
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            try
            {
                var user = _dbContext.Users.FirstOrDefault(u => u.Email == request.Email);
                if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    throw new Exception("Invalid credentials");
                }

                var token = GenerateJwtToken(user);
                return new LoginResponse
                {
                    Token = token,
                    UserId = user.Id,
                    Email = user.Email,
                    FullName = user.FullName
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Login error");
                throw;
            }
        }

        public async Task<ApiKeyResponse> GenerateApiKeyAsync(string userId)
        {
            try
            {
                var apiKey = new ApiKey
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = userId,
                    Key = GenerateRandomKey(),
                    Secret = GenerateRandomKey(),
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                _dbContext.ApiKeys.Add(apiKey);
                await _dbContext.SaveChangesAsync();

                return new ApiKeyResponse
                {
                    ApiKey = apiKey.Key,
                    ApiSecret = apiKey.Secret,
                    CreatedAt = apiKey.CreatedAt
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "API Key generation error");
                throw;
            }
        }

        public async Task<bool> ValidateTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"] ?? "");

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;
            }
            catch
            {
                return false;
            }
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"] ?? "your-secret-key-change-in-production");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserId", user.Id),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.FullName)
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRandomKey()
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Range(0, 32).Select(_ => chars[random.Next(chars.Length)]).ToArray());
        }
    }
}