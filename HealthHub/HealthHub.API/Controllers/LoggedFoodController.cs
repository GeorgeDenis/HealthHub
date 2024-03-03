using HealthHub.API.Models;
using HealthHub.Application.Features.LoggedFoods.Commands.CreateLoggedFood;
using HealthHub.Application.Features.LoggedFoods.Commands.DeleteLoggedFood;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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

        [Authorize(Roles = "User")]
        [HttpGet("/search-food/byName/{foodName}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetListOfFoodByName(string foodName)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("X-Api-Key", DotNetEnv.Env.GetString("APINinjasKey"));
            var response = await client.GetAsync($"https://api.api-ninjas.com/v1/nutrition?query={foodName}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var tempFoods = JsonSerializer.Deserialize<List<FoodProductResponseByName>>(content);
                if (tempFoods == null)
                {
                    return Ok(new List<FoodProductGeneralResponse>());
                }
                var foods = tempFoods.Select(ex => new FoodProductGeneralResponse
                {
                    Name = ex.Name,
                    Calories = ex.Calories,
                    ServingSizeInGrams = ex.ServingSizeInGrams,
                    Protein = ex.Protein,
                    Carbohydrates = ex.Carbohydrates,
                    Fat = ex.Fat
                }).ToList();

                return Ok(foods);
            }

            return BadRequest("Error");
        }
        [Authorize(Roles = "User")]
        [HttpGet("/search-food/byCode/{foodCode}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
       public async Task<IActionResult> GetFood(string foodCode)
        { 
            var client = new HttpClient();
            var response = await client.GetAsync($"https://world.openfoodfacts.net/api/v2/product/{foodCode}");
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                if(content.Contains("status\":0"))
                {
                    return BadRequest("No food found with this bar code");
                }
                var tempFood = JsonSerializer.Deserialize<FoodProductResponseByCode>(content);
                if (tempFood == null)
                {
                    return BadRequest("No food found with this bar code");
                }
                var foodByBarCode = new FoodProductGeneralResponse
                {
                    Name = tempFood.Product.ProductName,
                    Calories = tempFood.Product.NutrimentsData.Calories,
                    ServingSizeInGrams = tempFood.Product.NutrimentsData.ServingSizeInGrams,
                    Protein = tempFood.Product.NutrimentsData.Proteins,
                    Carbohydrates = tempFood.Product.NutrimentsData.Carbohydrates,
                    Fat = tempFood.Product.NutrimentsData.Fat
                };
                
                return Ok(foodByBarCode);
            }
            return BadRequest("Error");
        }
    }
}
