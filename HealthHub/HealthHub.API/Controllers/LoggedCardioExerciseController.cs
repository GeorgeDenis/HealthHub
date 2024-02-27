using HealthHub.Application.Features.LoggedCardioExercises.Commands.CreateLoggedCardioExercises;
using HealthHub.Application.Features.LoggedCardioExercises.Commands.DeleteLoggedCardioExercise;
using HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseByUserIdAndDate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{
    public class LoggedCardioExerciseController : ApiControllerBase
    {
        [Authorize(Roles ="User")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create(CreateLoggedCardioExerciseCommand command)
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
            var command = new DeleteLoggedCardioExerciseCommand { Id = id, UserId = userId };
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByUserIdAndDate(Guid userId, DateTime date)
        {
            var query = new GetLoggedCardioExerciseByUserIdAndDateQuery { UserId = userId, Date = date };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
