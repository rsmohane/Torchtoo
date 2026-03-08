using GrtTorchBearer.Core.DTOs;
using GrtTorchBearer.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GrtTorchBearer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _identityService;
        private readonly ILogger<IdentityController> _logger;

        public IdentityController(IIdentityService identityService, ILogger<IdentityController> logger)
        {
            _identityService = identityService;
            _logger = logger;
        }

        /// <summary>
        /// Auto KYC Verification
        /// </summary>
        [HttpPost("kyc-verify")]
        public async Task<IActionResult> KycVerify([FromBody] KycVerificationRequest request)
        {
            try
            {
                var result = await _identityService.VerifyKycAsync(request);
                return Ok(new ApiResponse<KycVerificationResult>
                {
                    Success = result.IsVerified,
                    Message = result.Message,
                    Data = result
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "KYC verification error");
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        /// <summary>
        /// Get Identity Profile
        /// </summary>
        [HttpGet("profile/{userId}")]
        public async Task<IActionResult> GetProfile(string userId)
        {
            try
            {
                var profile = await _identityService.GetProfileAsync(userId);
                return Ok(new ApiResponse<ProfileDto>
                {
                    Success = true,
                    Data = profile
                });
            }
            catch (Exception ex)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        /// <summary>
        /// Update Profile
        /// </summary>
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            try
            {
                var result = await _identityService.UpdateProfileAsync(User.FindFirst("UserId")?.Value, request);
                return Ok(new ApiResponse<ProfileDto>
                {
                    Success = true,
                    Message = "Profile updated successfully",
                    Data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        /// <summary>
        /// Check Duplicate Identity
        /// </summary>
        [HttpPost("check-duplicate")]
        public async Task<IActionResult> CheckDuplicate([FromBody] DuplicateCheckRequest request)
        {
            try
            {
                var result = await _identityService.CheckDuplicateIdentityAsync(request);
                return Ok(new ApiResponse<DuplicateCheckResult>
                {
                    Success = true,
                    Data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }
    }
}