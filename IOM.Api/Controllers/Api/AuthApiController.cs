using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IOM.Core.Models;
using IOM.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace IOM.Api.Controllers.Api
{
    [ApiController]
    [Route("api/auth")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AuthApiController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public AuthApiController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userService.ValidateLoginAsync(request.Email, request.Password);
            // A deactivated account (Active == false, set from the Users admin page) can't sign
            // in. Same message as a wrong password, so it doesn't reveal which accounts exist.
            if (user == null || !user.Active)
                return Unauthorized(new { message = "Invalid email or password." });

            var token = GenerateJwtToken(user);
            return Ok(new AuthResponse
            {
                Token = token,
                Name = user.Name ?? user.Email,
                Email = user.Email,
                Role = user.Role ?? "Client"
            });
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (request.Password != request.ConfirmPassword)
                return BadRequest(new { message = "Passwords do not match." });

            var existing = await _userService.GetByEmailAsync(request.Email);
            if (existing != null)
                return BadRequest(new { message = "An account with this email already exists." });

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                Role = "Client"
            };

            await _userService.CreateUser(user);
            var token = GenerateJwtToken(user);
            return Ok(new AuthResponse
            {
                Token = token,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            });
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"] ?? "IOM_SuperSecret_Key_2024_DoNotShare_32Chars!!"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Name ?? user.Email),
                new Claim(ClaimTypes.Role, user.Role ?? "Client")
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"] ?? "IOM",
                audience: _configuration["Jwt:Audience"] ?? "IOM",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class AuthResponse
    {
        public string Token { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
