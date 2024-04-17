using HealthHub.Application.Features.EmailMessages.Queries.GetUserData;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{
    public class EmailController : ApiControllerBase
    {
        [HttpGet]
        [Route("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLoggedFoodsData(Guid userId, [FromQuery] DateRange dateRange)
        {
            var query = new GetUserLoggedDataQuery { UserId = userId,DateRange = dateRange };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
            
        }

    }
}
