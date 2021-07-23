using System;

namespace BrandoMagic.Domain.Entities
{
    public class BannerVM
    {
        public long Id { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? DealStartDT { get; set; }
        public string BannerText { get; set; }
        public string RedirectUrl { get; set; }
    }
}
