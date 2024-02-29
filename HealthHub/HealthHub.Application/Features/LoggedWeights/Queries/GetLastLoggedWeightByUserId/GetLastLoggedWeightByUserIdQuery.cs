using MediatR;

namespace HealthHub.Application.Features.LoggedWeights.Queries.GetLastLoggedWeightByUserId
{
    public class GetLastLoggedWeightByUserIdQuery : IRequest<GetLastLoggedWeightByUserIdQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
