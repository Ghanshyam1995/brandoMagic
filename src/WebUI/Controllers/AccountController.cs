using BrandoMagic.Application.Commands;
using BrandoMagic.Application.Queries;
using BrandoMagic.WebUI.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BrandoMagic.WebUI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ApiControllerBase
    {
        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 9 May 21
        /// DESCRIPTION - login user
        /// </summary>
        /// <param name="userQuery"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> authenticate([FromBody] UserQuery userQuery)
        {
            var user = await Mediator.Send(userQuery);
            if (user == null) return NoContent();

            user.Token = TokenHelper.GenerateToken(user);
            return Ok(user);
        }

        /// <summary>
        /// CREATED BY - Ghanshyam Singh
        /// CREATED DATE - 15 May 2021
        /// DESCRIPTION - create and login new user
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> create([FromBody] CreateUserCommand createUserCommand)
        {
            var user = await Mediator.Send(createUserCommand);
            if (user == null) return NoContent();
            user.Token = TokenHelper.GenerateToken(user);
            return Ok(user);
        }
    }
}
