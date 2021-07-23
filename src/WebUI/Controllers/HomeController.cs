using Microsoft.AspNetCore.Mvc;
using BrandoMagic.Application.Queries;
using System.Threading.Tasks;
using System.Collections.Generic;
using BrandoMagic.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace BrandoMagic.WebUI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : ApiControllerBase
    {

        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 11 May 2021
        /// DESCRIPTION - get all categories
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CategoryVM>), (int)StatusCodes.Status200OK)]

        public async Task<IActionResult> getcategories()
        {
            return Ok(await Mediator.Send(new GetCategoryQuery()));
        }

        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 14 May 2021
        /// DESCRIPTION - Get all brands listing
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> getBrands()
        {
            return Ok(await Mediator.Send(new GetBrandsQuery()));
        }

        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 21 May 2021
        /// DESCRIPTION - search brands based on name and description
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> search(string s) => Ok(await Mediator.Send(new SearchBrandsQuery() { SearchText = s }));
    }
}
