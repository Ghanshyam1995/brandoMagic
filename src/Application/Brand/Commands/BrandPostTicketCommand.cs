using BrandoMagic.Application.Common.Interfaces;
using BrandoMagic.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Commands
{
    public class BrandPostTicketCommand : IRequest<string>
    {
        public long BrandId { get; set; }
        public long IssueId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string OrderId { get; set; }
        public string FilePath { get; set; }
        public long UserId { get; set; }

    }

    public class BrandPostTicketCommandHandler : IRequestHandler<BrandPostTicketCommand, string>
    {
        private readonly IBrandRepository _brandRepository;
        private readonly ICurrentUserService _userService;
        public BrandPostTicketCommandHandler(IBrandRepository brandRepository, ICurrentUserService userService)
        {
            _brandRepository = brandRepository;
            _userService = userService;

        }
        public async Task<string> Handle(BrandPostTicketCommand request, CancellationToken cancellationToken)
        => await _brandRepository.PostTicket(_userService._userId, request.Title, request.Description, request.BrandId, request.OrderId, request.IssueId, request.FilePath);
    }
}
