using System;
using System.Collections.Generic;

namespace BrandoMagic.Domain.Entities
{
    public class BrandPostVM
    {
        public BrandPostVM()
        {
            this.Comments = new List<PostCommentsVM>();
        }
        public long PostId { get; set; }
        public long BrandId { get; set; }
        public string BrandName { get; set; }
        public string BrandDescription { get; set; }
        public string BrandLogo { get; set; }
        public bool IsVerified { get; set; }
        public string PostImageUrl { get; set; }
        public string PostDescription { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CategoryName { get; set; }
        public bool Liked { get; set; }
        public int TotalLikes { get; set; }
        public int TotalComments { get; set; }
        public List<PostCommentsVM> Comments { get; set; }
    }
}
