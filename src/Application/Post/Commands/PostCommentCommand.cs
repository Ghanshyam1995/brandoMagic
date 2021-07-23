using BrandoMagic.Application.Common.Interfaces;
using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Commands
{
    public class PostCommentCommand : IRequest<PostCommentsVM>
    {
        public long PostId { get; set; }
        public string Comment { get; set; }
        public long UserId { get; set; }
    }

    public class PostCommentCommandHandler : IRequestHandler<PostCommentCommand, PostCommentsVM>
    {
        private readonly IBrandRepository _brandRepository;
        private readonly ICurrentUserService _userService;
        public PostCommentCommandHandler(IBrandRepository brandRepository, ICurrentUserService userService)
        {
            _brandRepository = brandRepository;
            _userService = userService;
        }
        public async Task<PostCommentsVM> Handle(PostCommentCommand request, CancellationToken cancellationToken)
        => await _brandRepository.PostComment(request.Comment, request.PostId, _userService._userId);
    }
}
