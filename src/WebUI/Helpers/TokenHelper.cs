using BrandoMagic.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BrandoMagic.WebUI.Helpers
{
    public static class TokenHelper
    {
        public static string GenerateToken(Users model)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("#@!321BRANDOMAGIC123!@#"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
               new Claim(ClaimTypes.Role, "Administrator"),
               new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
               new Claim(ClaimTypes.Name, model.Username),
               new Claim(ClaimTypes.Email, model.Email)
            };
            JwtSecurityToken token = new JwtSecurityToken("BRANDO_ISSUERS_KEY", "BRANDO_AUDIENCE_KEY", claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }
    }
}
