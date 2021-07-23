using BrandoMagic.Application.Common.Interfaces;
using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public class GetBrandContactQuery : IRequest<IEnumerable<BrandContactVM>>
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public long? BrandId { get; set; }
    }

    public class GetBrandContactQueryHandler : IRequestHandler<GetBrandContactQuery, IEnumerable<BrandContactVM>>
    {
        private readonly IBrandRepository _brandRepository;
        private readonly ICurrentUserService _userService;
        public GetBrandContactQueryHandler(IBrandRepository brandRepository, ICurrentUserService userService)
        {
            _brandRepository = brandRepository;
            _userService = userService;

        }

        public async Task<IEnumerable<BrandContactVM>> Handle(GetBrandContactQuery request, CancellationToken cancellationToken)
        => await _brandRepository.GetContacts(request.BrandId, request.PageIndex, request.PageSize, _userService._userId);
    }
}
