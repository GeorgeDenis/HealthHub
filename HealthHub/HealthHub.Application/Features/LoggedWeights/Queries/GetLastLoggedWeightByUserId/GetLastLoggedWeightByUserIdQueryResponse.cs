using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedWeights.Queries.GetLastLoggedWeightByUserId
{
    public class GetLastLoggedWeightByUserIdQueryResponse : BaseResponse
    {
        public GetLastLoggedWeightByUserIdQueryResponse() : base()
        {
        }
        public float Weight { get; set; }
        public DateTime DateLogged { get; set; }
    }
}