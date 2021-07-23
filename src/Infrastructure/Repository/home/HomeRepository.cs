using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace BrandoMagic.Infrastructure.Repository
{
    public class HomeRepository : IHomeRepository
    {
        private readonly IDbConnection _dbConnection;
        public HomeRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<IEnumerable<BannerVM>> GetBanners()
        => await _dbConnection.QueryAsync<BannerVM>("dbo.GetBanners", commandType: CommandType.Text);

        public async Task<IEnumerable<BrandsVM>> GetBrands() => await _dbConnection.QueryAsync<BrandsVM>("[Master].GetBrands", commandType: CommandType.StoredProcedure);

        public async Task<IEnumerable<CategoryVM>> GetCategories() => await _dbConnection.QueryAsync<CategoryVM>("dbo.GetCategories", commandType: CommandType.StoredProcedure);

        public async Task<IEnumerable<BrandsVM>> SearchBrands(string searchText)
        {
            var param = new DynamicParameters();
            param.Add("@Search", searchText, DbType.String);
            return await _dbConnection.QueryAsync<BrandsVM>("dbo.SearchBrands", param, commandType: CommandType.StoredProcedure);
        }
    }
}
