using HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.CreateLoggedMeasurements;
using HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.UpdateLoggedMeasurements;
using HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurements;
using HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurementsForToday;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{
    public class LoggedMeasurementsController : ApiControllerBase
    {
        [Authorize(Roles = "User")]
        [HttpGet]
        [Route("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLoggedMeasurements(Guid userId)
        {
            var result = await Mediator.Send(new GetLoggedMeasurementsQuery { UserId = userId });
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> CreateLoggedMeasurements([FromBody] CreateLoggedMeasurementsCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpPut]
        public async Task<IActionResult> UpdateLoggedMeasurements([FromBody] UpdateLoggedMeasurementsCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        [Route("get-today/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLoggedMeasurementsForToday(Guid userId)
        {
            var result = await Mediator.Send(new GetLoggedMeasurementsForTodayQuery { UserId = userId});
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }


    }
}
