using BrandoMagic.Domain.Entities;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Interfaces
{
    public interface IAccountRepository
    {
        Task<Users> GetUser(string userName, string password);
        Task<Users> CreateUser(Users user);
        Task<bool> IsFieldExists(string field, string value);
    }
}
