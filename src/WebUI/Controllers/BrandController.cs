using BrandoMagic.Application.Commands;
using BrandoMagic.Application.Queries;
using BrandoMagic.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace BrandoMagic.WebUI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    //[ApiController]
    public class BrandController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetBrandPosts(string brandIds, string categoryIds)
        {
            return Ok(await Mediator.Send(new GetBrandsPostQuery() { BrandIds = brandIds, CategoryIds = categoryIds }));
        }

        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 7th June 2021
        /// DESCRIPTION - get all contacts details of user selected brands
        /// </summary>
        /// <param name="brandId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetContacts([FromQuery] long? brandId, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 5)
        {
            return Ok(await Mediator.Send(new GetBrandContactQuery() { BrandId = brandId, PageIndex = pageIndex, PageSize = pageSize }));
        }

        /// <summary>
        /// Created By - Ghanshyam Singh
        /// Created Date - 11 June 2021
        /// Description - post new tickets
        /// </summary>
        /// <param name="postTicket"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> RaiseIssue(BrandPostTicketCommand commandPostTicket)
        {
            string msg = await Mediator.Send(commandPostTicket);
            return Ok(new { message = msg, success = msg.Contains("created") });
        }

        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 22 June 2021
        /// DESCRIPTION - get all contest details
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetContest()
        {
            var result = await Mediator.Send(new GetContestQuery());
            var activeContest = result.ToList().Where(e => e.ContestStatus.Equals("Active", System.StringComparison.OrdinalIgnoreCase));
            var upcomingContest = result.ToList().Except(activeContest);
            return Ok(new { active = activeContest, upcoming = upcomingContest });
        }


        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 5th July 2021
        /// DESCRIPTION - get discussions
        /// </summary>
        /// <param name="brandId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetDiscussion(long? brandId, int pageIndex, int pageSize)
        {
            return Ok(await Mediator.Send(new GetDiscussionQuery() { BrandId = brandId, PageIndex = pageIndex, PageSize = pageSize }));
        }
    }
}
