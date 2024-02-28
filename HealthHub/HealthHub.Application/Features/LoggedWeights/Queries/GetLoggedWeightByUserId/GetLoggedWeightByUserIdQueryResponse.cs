using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedWeights.Queries.GetLoggedWeightByUserId
{
    public class GetLoggedWeightByUserIdQueryResponse : BaseResponse
    {
        public GetLoggedWeightByUserIdQueryResponse() : base()
        {
        }
        public List<LoggedWeightDto> LoggedWeights { get; set; }

    }
}