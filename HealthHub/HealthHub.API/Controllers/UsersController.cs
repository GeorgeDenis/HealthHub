using HealthHub.Application.Features.Users.Commands.DeleteUser;
using HealthHub.Application.Features.Users.Commands.UpdateRole;
using HealthHub.Application.Features.Users.Commands.UpdateUser;
using HealthHub.Application.Features.Users.Queries.GetAll;
using HealthHub.Application.Features.Users.Queries.GetByEmail;
using HealthHub.Application.Features.Users.Queries.GetById;
using HealthHub.Application.Features.Users.Queries.GetCaloriesById;
using HealthHub.Application.Features.Users.Queries.GetUserSearchFiltered;
using HealthHub.Application.Features.Users.Queries.GetUserStats;
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
        [HttpGet("calories/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCaloriesById(string id)
        {
            var query = new GetCaloriesByIdQuery { UserId = Guid.Parse(id) };
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
        [HttpGet("search/{searchValue}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserSearchFiltered(string searchValue)
        {
            var query = new GetUserSearchFilteredQuery { SearchValue = searchValue };
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpGet("stats/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserStats(string id)
        {
            var query = new GetUserStatsQuery { UserId = Guid.Parse(id) };
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
        //[HttpGet("food/{code}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IActionResult> GetFood(string code)
        //{
        //    var client = new HttpClient();
        //    var response = await client.GetAsync($"https://world.openfoodfacts.net/api/v2/product/{code}");
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync();
        //        return Ok(content);
        //    }
        //    return BadRequest("Error");
        //}
        //AxIQuDyEorzhUCHnZ0WjVQ==PYdk8KZJD7Du6fD7
        //[HttpGet("food/{exercise}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IActionResult> GetCalories(string exercise)
        //{
        //    var client = new HttpClient();
        //    client.DefaultRequestHeaders.Add("X-Api-Key", "AxIQuDyEorzhUCHnZ0WjVQ==PYdk8KZJD7Du6fD7");
        //    var response = await client.GetAsync($"https://api.api-ninjas.com/v1/caloriesburned?activity={exercise}");

        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync();
        //        return Ok(content);
        //    }
        //    return BadRequest("Error");
        //}
    }
}
