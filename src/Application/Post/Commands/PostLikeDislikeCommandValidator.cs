using FluentValidation;

namespace BrandoMagic.Application.Commands
{
    public class PostLikeDislikeCommandValidator : AbstractValidator<PostLikeDislikeCommand>
    {
        public PostLikeDislikeCommandValidator()
        {
            RuleFor(x => x.PostId).NotEmpty().GreaterThan(0);
        }
    }
}
