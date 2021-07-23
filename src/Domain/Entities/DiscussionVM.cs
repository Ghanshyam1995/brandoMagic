using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BrandoMagic.Domain.Entities
{
    public class DiscussionVM
    {
        public DiscussionVM()
        {
            CommentList = new List<DiscussionComment>();
        }
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public string BrandLogo { get; set; }
        public string BrandName { get; set; }
        [JsonIgnore]
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get { return $"{FirstName ?? ""} {LastName ?? ""}"; }}
        public string ProfileImage { get; set; }

        public List<DiscussionComment> CommentList { get; set; }
    }

    public class DiscussionComment
    {
        public long DiscussionId { get; set; }
        public string Comments { get; set; }
        public long Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileImage{ get; set; }
        public bool IsMyComment { get; set; }
    }
}
