using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetRecentLoggedFoodByUserId
{
    public class GetRecentLoggedFoodByUserIdQueryResponse : BaseResponse
    {
        public GetRecentLoggedFoodByUserIdQueryResponse() : base()
        {
        }

        public List<LoggedFoodDto> LoggedFoods { get; set; }
    }
}