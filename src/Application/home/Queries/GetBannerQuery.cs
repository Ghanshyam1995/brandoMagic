using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public record GetBannerQuery : IRequest<IEnumerable<BannerVM>>;

    public class GetBannerQueryHandler : IRequestHandler<GetBannerQuery, IEnumerable<BannerVM>>
    {
        private readonly IHomeRepository _homeRepository;
        public GetBannerQueryHandler(IHomeRepository homeRepository)
        {
            _homeRepository = homeRepository;
        }
        public async Task<IEnumerable<BannerVM>> Handle(GetBannerQuery request, CancellationToken cancellationToken) => await _homeRepository.GetBanners();
    }
}
