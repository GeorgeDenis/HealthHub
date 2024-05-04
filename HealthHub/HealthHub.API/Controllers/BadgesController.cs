using HealthHub.Application.Features.Badges.Commands.CreateBadgeCommand;
using HealthHub.Application.Features.Badges.Commands.UpdateSpecialBadge;
using HealthHub.Application.Features.Badges.Queries;
using HealthHub.Application.Features.Badges.Queries.GetBadgesForUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class BadgesController : ApiControllerBase
    {
        [HttpPost]
        [Authorize(Roles = "User")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateBadgeCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return CreatedAtAction(nameof(GetByUserId), new { id = command.UserId }, result);
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "User")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByUserId(Guid id)
        {
            var result = await Mediator.Send(new GetBadgesForUserQuery { UserId = id });
            return Ok(result);
        }
        [HttpPut]
        [Authorize(Roles = "User")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateSpecialBadge(UpdateSpecialBadgeCommand command)
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
