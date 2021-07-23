using System;

namespace BrandoMagic.Domain.Entities
{
    public class PostCommentsVM
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public long PostId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string FirstName { get; set; }
        public string ProfileImage { get; set; }
        public bool IsMyComment { get; set; }
    }
}
