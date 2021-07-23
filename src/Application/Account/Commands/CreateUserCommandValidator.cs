using BrandoMagic.Application.Interfaces;
using FluentValidation;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Commands
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        private readonly IAccountRepository _accountRepository;
        public CreateUserCommandValidator(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;

            RuleFor(v => v.FirstName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(v => v.LastName)
                 .NotEmpty()
                .MaximumLength(50);

            RuleFor(v => v.Email)
                .NotEmpty()
                .MaximumLength(100)
                .EmailAddress()
                .MustAsync(UniqueEmail)
                .WithMessage("The specified email already exists.");

            RuleFor(v => v.Password)
                .NotEmpty()
                .MinimumLength(6)
                .MaximumLength(20);

            RuleFor(v => v.UserName)
                .NotEmpty()
                .MaximumLength(30)
                .MinimumLength(6)
                .MustAsync(UniqueUsername)
                .WithMessage("The specified username already exists.");
        }

        public async Task<bool> UniqueEmail(string email, CancellationToken cancellationToken)
        => await _accountRepository.IsFieldExists(field: "Email", value: email);


        public async Task<bool> UniqueUsername(string userName, CancellationToken cancellationToken)
        => await _accountRepository.IsFieldExists(field: "UserName", value: userName);
    }
}
