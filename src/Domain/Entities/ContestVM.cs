using System;

namespace BrandoMagic.Domain.Entities
{
    public class ContestVM
    {
        public long BrandId { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public string BrandLogo { get; set; }
        public string BrandName { get; set; }
        public bool IsVerified { get; set; }
        public string ContestStatus { get; set; }
        public string RedirectUrl { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}
