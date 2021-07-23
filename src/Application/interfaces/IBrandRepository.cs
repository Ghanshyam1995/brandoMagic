using BrandoMagic.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Interfaces
{
    public interface IBrandRepository
    {
        Task<IEnumerable<BrandPostVM>> GetUserSpecificBrandPost(long userId, string brandIds, string categoryIds);
        Task<bool> PostLikeDislike(long postId, long userId);
        Task<PostCommentsVM> PostComment(string comment, long postId, long userId);
        Task<IEnumerable<BrandContactVM>> GetContacts(long? brandId, int pageIndex, int pageSize, long userId);
        Task<string> PostTicket(long userId, string title, string description, long brandId, string orderId, long issueId, string filePath);
        Task<IEnumerable<ContestVM>> GetContest(long userId);
        Task<IEnumerable<DiscussionVM>> GetDiscussion(long userId, long? brandId, int pageIndex, int pageSize);
    }
}
