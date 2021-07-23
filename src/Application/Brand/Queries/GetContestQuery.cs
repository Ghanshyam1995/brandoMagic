using BrandoMagic.Application.Common.Interfaces;
using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public record GetContestQuery : IRequest<IEnumerable<ContestVM>>;

    public class GetContestQueryHandler : IRequestHandler<GetContestQuery, IEnumerable<ContestVM>>
    {
        private readonly ICurrentUserService _userService;
        private readonly IBrandRepository _brandRepository;
        public GetContestQueryHandler(ICurrentUserService userService, IBrandRepository brandRepository)
        {
            _userService = userService;
            _brandRepository = brandRepository;
        }
        public async Task<IEnumerable<ContestVM>> Handle(GetContestQuery request, CancellationToken cancellationToken)
        => await _brandRepository.GetContest(_userService._userId);
    }
}
