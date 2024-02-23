using HealthHub.Application.Features.MacronutrientsGoal.Commands.UpdateMacronutrientsGoal;
using HealthHub.Application.Features.MacronutrientsGoal.Queries.GetByUserId;
using HealthHub.Application.Features.MacronutrientsGoal.Queries.GetCaloriesByUserMacronutrients;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class MacronutrientsController : ApiControllerBase
    {
        [Authorize(Roles = "User")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMacronutrientsByUserId(Guid userId)
        {
            var query = new GetMacronutrientsByUserIdQuery { UserId = userId };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(Guid id, UpdateMacronutrientsGoalCommand command)
        {
            if (id != command.UserId)
            {
                return BadRequest("The ids must be the same!");
            }
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpGet("calories-by-macronutrients")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCaloriesByUserMacronutrients(Guid userId, int calories)
        {
            var query = new GetCaloriesByUserMacronutrientsQuery { UserId = userId, Calories = calories };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        
        }
    }
}
