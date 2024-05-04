using MediatR;

namespace HealthHub.Application.Features.Badges.Queries.GetBadgesForUser
{
    public class GetBadgesForUserQuery : IRequest<GetBadgesForUserQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
