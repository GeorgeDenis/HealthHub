using MediatR;

namespace HealthHub.Application.Features.LoggedWeights.Queries.GetLoggedWeightByUserId
{
    public class GetLoggedWeightByUserIdQuery : IRequest<GetLoggedWeightByUserIdQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
