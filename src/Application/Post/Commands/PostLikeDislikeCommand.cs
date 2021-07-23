using BrandoMagic.Application.Common.Interfaces;
using BrandoMagic.Application.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Commands
{
    public class PostLikeDislikeCommand : IRequest<bool>
    {
        public long PostId { get; set; }
    }

    public class PostLikeDislikeCommandHandler : IRequestHandler<PostLikeDislikeCommand, bool>
    {
        private readonly IBrandRepository _brandRepository;
        private readonly ICurrentUserService _userService;
        public PostLikeDislikeCommandHandler(IBrandRepository brandRepository, ICurrentUserService userService)
        {
            _brandRepository = brandRepository;
            _userService = userService;
        }
        public async Task<bool> Handle(PostLikeDislikeCommand request, CancellationToken cancellationToken)
        => await _brandRepository.PostLikeDislike(request.PostId, _userService._userId);
    }

}
