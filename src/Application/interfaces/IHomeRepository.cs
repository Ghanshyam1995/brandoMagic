using BrandoMagic.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Interfaces
{
    public interface IHomeRepository
    {
        Task<IEnumerable<CategoryVM>> GetCategories();
        Task<IEnumerable<BannerVM>> GetBanners();
        Task<IEnumerable<BrandsVM>> GetBrands();
        Task<IEnumerable<BrandsVM>> SearchBrands(string searchText);
    }
}
