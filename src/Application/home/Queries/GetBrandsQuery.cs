using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public record GetBrandsQuery : IRequest<IEnumerable<BrandsVM>>;

    public class GetBrandsQueryHandler : IRequestHandler<GetBrandsQuery, IEnumerable<BrandsVM>>
    {
        private readonly IHomeRepository _homeRepository;
        public GetBrandsQueryHandler(IHomeRepository homeRepository) { _homeRepository = homeRepository; }
        public async Task<IEnumerable<BrandsVM>> Handle(GetBrandsQuery request, CancellationToken cancellationToken) => await _homeRepository.GetBrands();
    }
}
