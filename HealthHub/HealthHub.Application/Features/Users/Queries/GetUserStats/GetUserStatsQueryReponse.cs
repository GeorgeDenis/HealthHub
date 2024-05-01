using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Users.Queries.GetUserStats
{
    public class GetUserStatsQueryReponse : BaseResponse
    {
        public GetUserStatsQueryReponse() : base()
        {
        }
        public UserStatsDto UserStats { get; set; } 
    }
}