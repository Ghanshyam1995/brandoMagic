using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public record GetCategoryQuery : IRequest<IEnumerable<CategoryVM>>;
    public class GetCategoryQueryHandler : IRequestHandler<GetCategoryQuery, IEnumerable<CategoryVM>>
    {
        private readonly IHomeRepository _homeRepository;
        public GetCategoryQueryHandler(IHomeRepository homeRepository)
        {
            _homeRepository = homeRepository;
        }
        public async Task<IEnumerable<CategoryVM>> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
         => await _homeRepository.GetCategories();

    }
}
