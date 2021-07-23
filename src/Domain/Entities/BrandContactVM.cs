namespace BrandoMagic.Domain.Entities
{
    public class BrandContactVM
    {
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public string FaqUrl { get; set; }
        public bool IsVerified { get; set; }
        public string BrandName { get; set; }
        public string BrandLogo { get; set; }
        public long BrandId { get; set; }
    }
}
