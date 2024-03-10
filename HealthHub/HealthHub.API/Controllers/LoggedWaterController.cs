using HealthHub.Application.Features.LoggedWaterEntries.Commands.CreateLoggedWater;
using HealthHub.Application.Features.LoggedWaterEntries.Commands.UpdateLoggedWater;
using HealthHub.Application.Features.LoggedWaterEntries.Queries.GetLoggedWaterByUserIdAndDate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class LoggedWaterController : ApiControllerBase
    {
        [Authorize(Roles = "User")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateLoggedWater([FromBody] CreateLoggedWaterCommand createLoggedWaterCommand)
        {
            var result = await Mediator.Send(createLoggedWaterCommand);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLoggedWaterByUserIdAndDate([FromQuery] GetLoggedWaterByUserIdAndDateQuery getLoggedWaterByUserIdAndDateQuery)
        {
            var result = await Mediator.Send(getLoggedWaterByUserIdAndDateQuery);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateLoggedWater([FromBody] UpdateLoggedWaterCommand updateLoggedWaterCommand)
        {
            var result = await Mediator.Send(updateLoggedWaterCommand);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

    }
}
