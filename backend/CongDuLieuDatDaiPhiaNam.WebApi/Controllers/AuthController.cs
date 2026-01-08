using System;
using System.Security.Cryptography;
using System.Text;
using CongDuLieuDatDaiPhiaNam.Domain.Entities;
using CongDuLieuDatDaiPhiaNam.Domain.Enums;
using CongDuLieuDatDaiPhiaNam.Infrastructure.Data;
using CongDuLieuDatDaiPhiaNam.WebApi.Helpers;
using CongDuLieuDatDaiPhiaNam.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CongDuLieuDatDaiPhiaNam.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/cdlddpn/auth")]
    public class AuthController : ControllerBase
    {
        private readonly CdlddpnDbContext _db;

        public AuthController(CdlddpnDbContext db)
        {
            _db = db;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password) ||
                string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            var exists = await _db.Users.AnyAsync(x =>
                x.Username == request.Username || x.Email == request.Email);
            if (exists)
            {
                return Conflict(new { message = "user_exists" });
            }

            var userType = UserType.CongDan;
            if (EnumHelper.TryParse(request.UserType, out UserType parsedType))
            {
                userType = parsedType;
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username.Trim(),
                PasswordHash = HashPassword(request.Password),
                FullName = request.FullName.Trim(),
                Email = request.Email.Trim(),
                Phone = request.Phone?.Trim(),
                UserType = userType,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(CreateAuthResponse(user));
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            var user = await _db.Users
                .FirstOrDefaultAsync(x => x.Username == request.Username || x.Email == request.Username);
            if (user == null || !user.IsActive)
            {
                return Unauthorized();
            }

            if (!string.Equals(user.PasswordHash, HashPassword(request.Password), StringComparison.Ordinal))
            {
                return Unauthorized();
            }

            user.LastLogin = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(CreateAuthResponse(user));
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<AuthResponse>> Refresh([FromBody] RefreshRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.RefreshToken))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            if (!TryGetUserIdFromRefreshToken(request.RefreshToken, out var userId))
            {
                return Unauthorized();
            }

            var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null || !user.IsActive)
            {
                return Unauthorized();
            }

            return Ok(CreateAuthResponse(user));
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "logged_out" });
        }

        private static AuthResponse CreateAuthResponse(User user)
        {
            return new AuthResponse
            {
                UserId = user.Id,
                Username = user.Username,
                Email = user.Email,
                UserType = user.UserType.ToString(),
                AccessToken = CreateToken("access", user.Id),
                RefreshToken = CreateToken("refresh", user.Id),
                ExpiresIn = 3600
            };
        }

        private static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            var builder = new StringBuilder(bytes.Length * 2);
            foreach (var b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }

            return builder.ToString();
        }

        private static string CreateToken(string prefix, Guid userId)
        {
            var payload = $"{prefix}:{userId}:{Guid.NewGuid()}:{DateTime.UtcNow.Ticks}";
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(payload));
        }

        private static bool TryGetUserIdFromRefreshToken(string token, out Guid userId)
        {
            userId = Guid.Empty;
            if (string.IsNullOrWhiteSpace(token))
            {
                return false;
            }

            try
            {
                var raw = Encoding.UTF8.GetString(Convert.FromBase64String(token));
                var parts = raw.Split(':', StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length < 3)
                {
                    return false;
                }

                if (!string.Equals(parts[0], "refresh", StringComparison.OrdinalIgnoreCase))
                {
                    return false;
                }

                return Guid.TryParse(parts[1], out userId);
            }
            catch
            {
                return false;
            }
        }
    }
}
