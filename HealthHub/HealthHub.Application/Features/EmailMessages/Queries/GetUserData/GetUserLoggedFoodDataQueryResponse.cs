using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.EmailMessages.Queries.GetUserData
{
    public class GetUserLoggedFoodDataQueryResponse : BaseResponse
    {
        public GetUserLoggedFoodDataQueryResponse() : base()
        {
        }
        public List<LoggedFoodDto> LoggedFoods { get; set; } = new List<LoggedFoodDto>();
    }
}