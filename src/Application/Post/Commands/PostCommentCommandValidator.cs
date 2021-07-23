using FluentValidation;

namespace BrandoMagic.Application.Commands
{
    public class PostCommentCommandValidator : AbstractValidator<PostCommentCommand>
    {
        public PostCommentCommandValidator()
        {
            RuleFor(r => r.Comment).NotEmpty();

            RuleFor(r => r.PostId).GreaterThan(0);
        }
    }
}
