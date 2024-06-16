using HealthHub.Application.Features.AIChats.Commands.CreateAIConversationChat;
using HealthHub.Application.Features.AIChats.Queries.GetAIChatByConversationIdQuery;
using HealthHub.Application.Features.AIChats.Queries.GetAIChatByIdQuery;
using HealthHub.Application.Features.AIConversations.Commands.CreateAIConversationCommand;
using HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByIdQuery;
using HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByUserIdQuery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class AIChatController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateAIChatCommand command)
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
            var result = await Mediator.Send(new GetAIChatByIdQuery { Id = id });
            return Ok(result);
        }
        [HttpGet("conversation/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByConversationId(Guid id)
        {
            var result = await Mediator.Send(new GetAIChatByConversationIdQuery { AIConversationId = id });
            return Ok(result);
        }

    }
}
