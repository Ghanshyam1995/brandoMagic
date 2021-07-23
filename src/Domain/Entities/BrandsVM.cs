namespace BrandoMagic.Domain.Entities
{
    public class BrandsVM
    {
        public long Id { get; set; }
        public string BrandName { get; set; }
        public string BrandLogo { get; set; }
        public string BrandDescription { get; set; }
        public bool IsVerified { get; set; }
        public bool IsSelected { get; set; }
    }
}
