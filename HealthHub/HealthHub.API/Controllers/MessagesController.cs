using HealthHub.Application.Features.Messages.Queries.GetMessagesBetweenUsers;
using HealthHub.Application.Features.Messages.Queries.GetUsersListByMessages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class MessagesController : ApiControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMessagesBetweenUsers([FromQuery] Guid userId1, [FromQuery] Guid userId2)
        {
            var query = new GetMessagesBetweenUsersQuery { User1 = userId1, User2 = userId2 };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpGet]
        [Route("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUsersListByMessages(Guid userId)
        {
            var query = new GetUsersListByMessagesQuery { UserId = userId };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
