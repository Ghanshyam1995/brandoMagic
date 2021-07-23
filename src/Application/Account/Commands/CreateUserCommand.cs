using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Commands
{
    public class CreateUserCommand : IRequest<Users>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool External { get; set; }
        public string Source { get; set; }
    }

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Users>
    {
        private readonly IAccountRepository _accountRepository;
        public CreateUserCommandHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public async Task<Users> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = new Users { FirstName = request.FirstName, Email = request.Email, LastName = request.LastName, Username = request.UserName, Password = request.Password, 
                    External = request.External, Source = request.Source };
            return await _accountRepository.CreateUser(user);
        }
    }

}
