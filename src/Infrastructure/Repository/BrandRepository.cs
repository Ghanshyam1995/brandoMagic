using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace BrandoMagic.Infrastructure.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly IDbConnection _dbConnection;
        public BrandRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<IEnumerable<BrandPostVM>> GetUserSpecificBrandPost(long userId, string brandIds, string categoryIds)
        {
            IEnumerable<BrandPostVM> postList = new List<BrandPostVM>();
            IEnumerable<PostCommentsVM> cmtList = new List<PostCommentsVM>();
            var parameters = new DynamicParameters();
            parameters.Add("@BrandIds", brandIds, DbType.String);
            parameters.Add("@CategoryIds", categoryIds, DbType.String);
            parameters.Add("@UserId", userId, DbType.Int64);
            var result = await _dbConnection.QueryMultipleAsync("Brand.GetUserBrandPosts", parameters, commandType: CommandType.StoredProcedure);
            postList = await result.ReadAsync<BrandPostVM>();
            cmtList = await result.ReadAsync<PostCommentsVM>();
            if (cmtList.Any())
                postList = postList.Select(x => { x.Comments = cmtList.Where(c => c.PostId == x.PostId).ToList(); return x; });

            return postList;
        }

        public async Task<bool> PostLikeDislike(long userId, long postId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PostId", postId, DbType.Int64);
            parameters.Add("@UserId", userId, DbType.Int64);
            return await _dbConnection.ExecuteScalarAsync<int>("Brand.PostLikeDislike", parameters, commandType: CommandType.StoredProcedure) > 0;
        }

        public async Task<PostCommentsVM> PostComment(string comment, long postId, long userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PostId", postId, DbType.Int64);
            parameters.Add("@UserId", userId, DbType.Int64);
            parameters.Add("@Comment", comment, DbType.String);
            return await _dbConnection.QueryFirstOrDefaultAsync<PostCommentsVM>("Brand.PostComment", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<BrandContactVM>> GetContacts(long? brandId, int pageIndex, int pageSize, long userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageIndex", pageIndex, DbType.Int32);
            parameters.Add("@PageSize", pageSize, DbType.Int32);
            parameters.Add("@UserId", userId, DbType.Int64);
            parameters.Add("@BrandId", brandId.HasValue ? brandId.Value : (object)DBNull.Value, DbType.Int64);
            return await _dbConnection.QueryAsync<BrandContactVM>("Brand.GetContactDetails", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<string> PostTicket(long userId, string title, string description, long brandId, string orderId, long issueId, string filePath)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId, DbType.Int64);
            parameters.Add("@Title", title, DbType.String);
            parameters.Add("@Description", description, DbType.String);
            parameters.Add("@BrandId", brandId, DbType.Int64);
            parameters.Add("@OrderId", orderId, DbType.String);
            parameters.Add("@IssueId", issueId, DbType.Int64);
            parameters.Add("@FilePath", filePath, DbType.String);
            return await _dbConnection.QuerySingleAsync<string>("Brand.PostTickets", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<ContestVM>> GetContest(long userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId, DbType.Int64);
            return await _dbConnection.QueryAsync<ContestVM>("Brand.GetContestDetails", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<DiscussionVM>> GetDiscussion(long userId, long? brandId, int pageIndex, int pageSize)
        {
            IEnumerable<DiscussionVM> list = new List<DiscussionVM>();
            var parameters = new DynamicParameters();
            parameters.Add("@PageIndex", pageIndex, DbType.Int32);
            parameters.Add("@PageSize", pageSize, DbType.Int32);
            parameters.Add("@UserId", userId, DbType.Int64);
            parameters.Add("@BrandId", brandId.HasValue ? brandId.Value : (object)DBNull.Value, DbType.Int64);
            var result = await _dbConnection.QueryMultipleAsync("dbo.GetDiscussions", parameters, commandType: CommandType.StoredProcedure);
            var discussions = await result.ReadAsync<DiscussionVM>();
            list = discussions.ToList();
            var cl = await result.ReadAsync<DiscussionComment>();
            if (list.Any())
                list = list.Select(x => { x.CommentList = cl.Where(c => c.DiscussionId == x.Id).ToList(); return x; });
            return list;
        }
    }
}
