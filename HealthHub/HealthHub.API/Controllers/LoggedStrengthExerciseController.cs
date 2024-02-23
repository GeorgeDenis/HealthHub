using HealthHub.Application.Features.LoggedStrengthExercises.Commands.CreateLoggedStrengthExercise;
using HealthHub.Application.Features.LoggedStrengthExercises.Commands.DeleteLoggedStrengthExercise;
using HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetLoggedStrengthExerciseByUserIdAndDate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class LoggedStrengthExerciseController : ApiControllerBase
    {
        
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByUserIdAndDate([FromQuery] GetLoggedStrengthExerciseByUserIdAndDateQuery query)
        {
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create(CreateLoggedStrengthExerciseCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(Guid id, Guid userId)
        {
            var result = await Mediator.Send(new DeleteLoggedStrengthExerciseCommand { Id = id, UserId = userId });
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

    }
}
