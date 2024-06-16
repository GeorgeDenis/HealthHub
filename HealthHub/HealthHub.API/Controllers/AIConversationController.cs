using HealthHub.Application.Features.AIConversations.Commands.CreateAIConversationCommand;
using HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByIdQuery;
using HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByUserIdQuery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class AIConversationController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateAIConversationCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await Mediator.Send(new GetAIConversationByIdQuery { Id = id });
            return Ok(result);
        }

        [HttpGet("byUserId/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByUserId(Guid id)
        {
            var result = await Mediator.Send(new GetAIConversationByUserIdQuery { UserId = id });
            return Ok(result);
        }
    }
}
