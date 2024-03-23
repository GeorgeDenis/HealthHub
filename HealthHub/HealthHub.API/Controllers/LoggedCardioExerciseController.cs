using HealthHub.API.Models;
using HealthHub.Application.Features.LoggedCardioExercises.Commands.CreateLoggedCardioExercises;
using HealthHub.Application.Features.LoggedCardioExercises.Commands.DeleteLoggedCardioExercise;
using HealthHub.Application.Features.LoggedCardioExercises.Commands.UpdateLoggedCardioExercise;
using HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseByUserIdAndDate;
using HealthHub.Application.Features.LoggedCardioExercises.Queries.GetRecentLoggedCardioExercises;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace HealthHub.API.Controllers
{
    public class LoggedCardioExerciseController : ApiControllerBase
    {
        [Authorize(Roles = "User")]
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
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(UpdateLoggedCardioExerciseCommand command)
        {
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

        [Authorize(Roles = "User")]
        [HttpGet("get-recent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetRecentLoggedCardioExercises(Guid userId)
        {
            var result = await Mediator.Send(new GetRecentLoggedCardioExercisesQuery { UserId = userId });
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpGet("search-cardio-exercise")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetListOfCardioExercisesByName(string exerciseName)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("X-Api-Key", DotNetEnv.Env.GetString("APINinjasKey"));
            var response = await client.GetAsync($"https://api.api-ninjas.com/v1/caloriesburned?activity={exerciseName}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                if (string.IsNullOrEmpty(content))
                {
                    return Ok(new List<CardioExercise>());
                }
                var tempExercises = JsonSerializer.Deserialize<List<CardioExercise>>(content);
                if (tempExercises == null)
                {
                    return Ok(new List<CardioExercise>());
                }
                var exercises = tempExercises.Select(ex => new CardioExercise
                {
                    Name = ex.Name,
                    CaloriesPerHour = ex.CaloriesPerHour
                }).ToList();

                return Ok(exercises);
            }

            return BadRequest("Error");
        }
        

    }
}
