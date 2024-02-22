using HealthHub.Application.Features.Users.Commands.DeleteUser;
using HealthHub.Application.Features.Users.Commands.UpdateRole;
using HealthHub.Application.Features.Users.Commands.UpdateUser;
using HealthHub.Application.Features.Users.Queries.GetAll;
using HealthHub.Application.Features.Users.Queries.GetByEmail;
using HealthHub.Application.Features.Users.Queries.GetById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{
    public class UsersController : ApiControllerBase
    {
        [Authorize(Roles = "User")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new GetAllUsersQuery());
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserById(string id)
        {
            var query = new GetByIdUserQuery { UserId = id };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                if (result.Message == $"User with id {id} not found")
                {
                    return NotFound(result);
                }
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpGet("email/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var query = new GetByEmailUserQuery { Email = email };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(Guid id, UpdateUserCommand command)
        {
            if (id != command.Id)
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

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new DeleteUserCommand { UserId = id };
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("/role/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateRole(Guid id, UpdateUserRoleCommand command)
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
    }
}
