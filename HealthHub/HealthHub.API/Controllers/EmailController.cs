using HealthHub.Application.Features.EmailMessages.Queries.GetUserData;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{
    public class EmailController : ApiControllerBase
    {
        [HttpGet]
        [Route("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLoggedFoodsData(Guid userId)
        {
            var query = new GetUserLoggedFoodDataQuery { UserId = userId };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
            
        }

    }
}
