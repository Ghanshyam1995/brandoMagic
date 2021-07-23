using BrandoMagic.Application.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BrandoMagic.WebUI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class PostController : ApiControllerBase
    {
        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// Created Date - 28 May 2021
        /// DESCRIPTION - post like dislike
        /// </summary>
        /// <param name="postCommand"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> PostLikeDislike(PostLikeDislikeCommand postCommand)
        {
            return Ok(await Mediator.Send(postCommand));
        }

        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 28 May 2021
        /// DESCRIPTION - post comment
        /// </summary>
        /// <param name="commentCommand"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> PostComment(PostCommentCommand commentCommand)
        {
            return Ok(await Mediator.Send(commentCommand));
        }
    }
}
