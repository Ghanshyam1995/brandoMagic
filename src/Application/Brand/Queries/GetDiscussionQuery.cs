using BrandoMagic.Application.Common.Interfaces;
using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public class GetDiscussionQuery : IRequest<IEnumerable<DiscussionVM>>
    {
        public long? BrandId { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
    }

    public class GetDiscussionQueryHandler : IRequestHandler<GetDiscussionQuery, IEnumerable<DiscussionVM>>
    {
        private readonly IBrandRepository _brandRepository;
        private readonly ICurrentUserService _userService;
        public GetDiscussionQueryHandler(IBrandRepository brandRepository, ICurrentUserService userService)
        {
            _brandRepository = brandRepository;
            _userService = userService;

        }
        public async Task<IEnumerable<DiscussionVM>> Handle(GetDiscussionQuery request, CancellationToken cancellationToken)
        => await _brandRepository.GetDiscussion(_userService._userId, request.BrandId, request.PageIndex, request.PageSize);
    }
}
