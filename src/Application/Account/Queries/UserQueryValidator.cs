using FluentValidation;

namespace BrandoMagic.Application.Queries
{
    public class UserQueryValidator : AbstractValidator<UserQuery>
    {
        public UserQueryValidator()
        {
            RuleFor(x => x.Password).MaximumLength(30).NotEmpty();
            RuleFor(x => x.UserName).MaximumLength(30).NotEmpty();
        }
    }
}
