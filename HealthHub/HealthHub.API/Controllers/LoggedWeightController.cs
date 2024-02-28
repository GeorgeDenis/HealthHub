using HealthHub.Application.Features.LoggedWeights.Commands.CreateLoggedWeight;
using HealthHub.Application.Features.LoggedWeights.Queries.GetLoggedWeightByUserId;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class LoggedWeightController : ApiControllerBase
    {
        [Authorize(Roles = "User")]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetLoggedWeightByUserId(Guid userId)
        {
            var query = new GetLoggedWeightByUserIdQuery() { UserId = userId };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> CreateLoggedWeight([FromBody] CreateLoggedWeightCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
