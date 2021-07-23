using BrandoMagic.Application.Common.Interfaces;
using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public class GetBrandsPostQuery : IRequest<IEnumerable<BrandPostVM>>
    {
        public string CategoryIds { get; set; }
        public string BrandIds { get; set; }
    }

    public class GetBrandsPostQueryHandler : IRequestHandler<GetBrandsPostQuery, IEnumerable<BrandPostVM>>
    {

        private readonly IBrandRepository _brandRepository;
        private readonly ICurrentUserService _userService;
        public GetBrandsPostQueryHandler(IBrandRepository brandRepository, ICurrentUserService userService)
        {
            _brandRepository = brandRepository;
            _userService = userService;

        }
        public async Task<IEnumerable<BrandPostVM>> Handle(GetBrandsPostQuery request, CancellationToken cancellationToken) => await _brandRepository.GetUserSpecificBrandPost(_userService._userId,request.BrandIds, request.CategoryIds);
    }
}
