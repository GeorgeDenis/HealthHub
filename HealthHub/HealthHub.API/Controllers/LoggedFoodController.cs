using HealthHub.Application.Features.LoggedFoods.Commands.CreateLoggedFood;
using HealthHub.Application.Features.LoggedFoods.Commands.DeleteLoggedFood;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{
    
    public class LoggedFoodController : ApiControllerBase
    {
        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> CreateLoggedFood([FromBody] CreateLoggedFoodCommand createLoggedFoodCommand)
        {
            var result = await Mediator.Send(createLoggedFoodCommand);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> GetLoggedFoodByUserIdAndDate([FromQuery] GetLoggedFoodByUserIdAndDateQuery getLoggedFoodByUserIdAndDateQuery)
        {
            var result = await Mediator.Send(getLoggedFoodByUserIdAndDateQuery);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpDelete("{loggedFoodId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(Guid loggedFoodId, Guid userId)
        {
            var result = await Mediator.Send(new DeleteLoggedFoodCommand { LoggedFoodId = loggedFoodId, UserId = userId });
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
