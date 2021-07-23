using FluentValidation;

namespace BrandoMagic.Application.Commands
{
    public class BrandPostTicketCommandValidator : AbstractValidator<BrandPostTicketCommand>
    {
        public BrandPostTicketCommandValidator()
        {
            RuleFor(x => x.BrandId).GreaterThan(0).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.IssueId).GreaterThan(0);
        }
    }
}
