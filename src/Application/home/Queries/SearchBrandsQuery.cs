using BrandoMagic.Application.Interfaces;
using BrandoMagic.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Queries
{
    public class SearchBrandsQuery : IRequest<IEnumerable<BrandsVM>>
    {
        public string SearchText { get; set; }
    }

    public class SearchBradsQueryHandler : IRequestHandler<SearchBrandsQuery, IEnumerable<BrandsVM>>
    {
        private readonly IHomeRepository _homeRepository;
        public SearchBradsQueryHandler(IHomeRepository homeRepository)
        {
            _homeRepository = homeRepository;
        }
        public async Task<IEnumerable<BrandsVM>> Handle(SearchBrandsQuery request, CancellationToken cancellationToken) => await _homeRepository.SearchBrands(request.SearchText);
    }
}
