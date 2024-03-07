using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodNutritentsByUserIdAndDate
{
    public class GetLoggedFoodNutritentsByUserIdAndDateQueryResponse : BaseResponse
    {
        public GetLoggedFoodNutritentsByUserIdAndDateQueryResponse() : base()
        {
        }
        public LoggedFoodNutrientsDto LoggedFoodNutrients { get; set; }

    }
}