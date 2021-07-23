using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using Dapper;
using System.Data;
using System.Threading.Tasks;

namespace BrandoMagic.Infrastructure.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IDbConnection _dbConnection;
        public AccountRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<Users> CreateUser(Users user)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserName", user.Username, DbType.String);
            parameters.Add("@Password", user.Password, DbType.String);
            parameters.Add("@Email", user.Email, DbType.String);
            parameters.Add("@FirstName", user.FirstName, DbType.String);
            parameters.Add("@LastName", user.LastName, DbType.String);
            parameters.Add("@Source", user.Source, DbType.String);
            parameters.Add("@IsExternal", user.External, DbType.Boolean);
            return await _dbConnection.QueryFirstOrDefaultAsync<Users>("[Admin].[InsertUser]", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<Users> GetUser(string userName, string password)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserName", userName, DbType.String);
            parameters.Add("@Password", password, DbType.String);
            return await _dbConnection.QueryFirstOrDefaultAsync<Users>("Admin.LoginUser", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> IsFieldExists(string field, string value)
        {
            var parameters = new DynamicParameters();
            string query = $"SELECT COUNT(1) FROM Users WHERE {field} = '{value}'";
            return await _dbConnection.QuerySingleAsync<int>(query, commandType: CommandType.Text) > 0;
        }
    }
}
