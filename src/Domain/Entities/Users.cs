using System.Text.Json.Serialization;

namespace BrandoMagic.Domain.Entities
{
    public class Users
    {
        [JsonIgnore]
        public long Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string ProfileImage { get; set; }
        public string Token { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        [JsonIgnore]
        public bool External { get; set; }
        [JsonIgnore]
        public string Source { get; set; }
    }
}
