using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate
{
    public class GetLoggedFoodByUserIdAndDateQueryResponse : BaseResponse
    {
        public GetLoggedFoodByUserIdAndDateQueryResponse() : base()
        {
        }
        public List<LoggedFoodDto> LoggedFoods { get; set; }
    }
}