using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public class UserQuery : IRequest<Users>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class UserQueryHandler : IRequestHandler<UserQuery, Users>
    {
        private readonly IAccountRepository _accountRepository;
        public UserQueryHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public async Task<Users> Handle(UserQuery request, CancellationToken cancellationToken)
        {
            return await _accountRepository.GetUser(request.UserName, request.Password);
        }
    }
}
