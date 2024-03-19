using HealthHub.API.Models;
using HealthHub.Application.Features.LoggedStrengthExercises.Commands.CreateLoggedStrengthExercise;
using HealthHub.Application.Features.LoggedStrengthExercises.Commands.DeleteLoggedStrengthExercise;
using HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetLoggedStrengthExerciseByUserIdAndDate;
using HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetRecentLoggedStrengthExercises;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace HealthHub.API.Controllers
{

    public class LoggedStrengthExerciseController : ApiControllerBase
    {
        private const string ApiUrl = "https://api.api-ninjas.com/v1/exercises?muscle=";

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByUserIdAndDate([FromQuery] GetLoggedStrengthExerciseByUserIdAndDateQuery query)
        {
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create(CreateLoggedStrengthExerciseCommand command)
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
            var result = await Mediator.Send(new DeleteLoggedStrengthExerciseCommand { Id = id, UserId = userId });
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpGet("get-recent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetRecentLoggedStrengthExercises(Guid userId)
        {
            var result = await Mediator.Send(new GetRecentLoggedStrengthExercisesQuery { UserId = userId });
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpGet("search-strength-exercise")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetListOfStrengthExercisesByName(string muscleName, string? difficulty)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("X-Api-Key", DotNetEnv.Env.GetString("APINinjasKey"));
            string url = $"{ApiUrl}{muscleName}";
            if (difficulty != null)
            {
                url += $"&difficulty={difficulty}";
            }
            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                if (string.IsNullOrEmpty(content))
                {
                    return Ok(new List<StrengthExercise>());
                }

                var tempExercises = JsonSerializer.Deserialize<List<StrengthExercise>>(content);
                if (tempExercises == null)
                {
                    return Ok(new List<StrengthExercise>());
                }
                var exercises = tempExercises.Select(ex => new StrengthExercise
                {
                    Name = ex.Name,
                    Muscle = ex.Muscle,
                    Difficulty = ex.Difficulty,
                    Instructions = ex.Instructions
                }).ToList();

                return Ok(exercises);
            }
            return BadRequest("Error");
        }

    }
}
