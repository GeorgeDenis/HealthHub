using HealthHub.API.Models;
using HealthHub.Application.Features.LoggedFoods.Commands.CreateLoggedFood;
using HealthHub.Application.Features.LoggedFoods.Commands.DeleteLoggedFood;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodNutritentsByUserIdAndDate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
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
        [HttpGet("get-nutrients")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLoggedFoodNutritentsByUserIdAndDate([FromQuery] GetLoggedFoodNutritentsByUserIdAndDateQuery getLoggedFoodNutritentsByUserIdAndDateQuery)
        {
            var result = await Mediator.Send(getLoggedFoodNutritentsByUserIdAndDateQuery);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpGet("search-food/byName/{foodName}")]
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
        [HttpGet("search-food/byCode/{foodCode}")]
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
        [HttpPost("search-food/byImage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFoodByImage(IFormFile foodImage)
        {
            var apiUserToken = DotNetEnv.Env.GetString("LogMealKey");

            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiUserToken);

            var segmentationUrl = "https://api.logmeal.es/v2/image/segmentation/complete";

            using var imageContent = new StreamContent(foodImage.OpenReadStream());
            imageContent.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            var formData = new MultipartFormDataContent
        {
            { imageContent, "image", foodImage.FileName }
        };

            var segmentationResponse = await httpClient.PostAsync(segmentationUrl, formData);

            if (!segmentationResponse.IsSuccessStatusCode)
            {
                return BadRequest(await segmentationResponse.Content.ReadAsStringAsync());
            }

            var segmentationResultJson = await JsonDocument.ParseAsync(await segmentationResponse.Content.ReadAsStreamAsync());
            if (!segmentationResultJson.RootElement.TryGetProperty("imageId", out JsonElement imageIdElement))
            {
                return BadRequest("Failed to retrieve imageId from segmentation response.");
            }
            var imageId = imageIdElement.GetInt32();


            if (imageId == null)
            {
                return BadRequest("Failed to get image ID from segmentation response.");
            }

            var nutritionalInfoUrl = "https://api.logmeal.es/v2/recipe/nutritionalInfo";
            var nutritionalInfoPayload = new { imageId };

            var nutritionalInfoResponse = await httpClient.PostAsJsonAsync(nutritionalInfoUrl, nutritionalInfoPayload);

            if (!nutritionalInfoResponse.IsSuccessStatusCode)
            {
                return BadRequest("Failed to retrieve nutritional information.");
            }

            var nutritionalInfoString = await nutritionalInfoResponse.Content.ReadAsStringAsync();

            var nutritionalInfo = JsonSerializer.Deserialize<FoodProductResponseByImage>(nutritionalInfoString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (nutritionalInfo == null)
            {
                return BadRequest("Failed to deserialize nutritional information.");
            }

            var foodResponse = new FoodProductGeneralResponse
            {
                Name = nutritionalInfo.FoodNames.FirstOrDefault(),
                ServingSizeInGrams = nutritionalInfo.ServingSize,
                Calories = nutritionalInfo.NutritionalInfo.Calories,
                Protein = nutritionalInfo.NutritionalInfo.TotalNutrients.Protein.Quantity,
                Carbohydrates = nutritionalInfo.NutritionalInfo.TotalNutrients.Carbohydrates.Quantity,
                Fat = nutritionalInfo.NutritionalInfo.TotalNutrients.Fat.Quantity
            };


            return Ok(foodResponse);
        }

    }
}
