using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetUserStats
{
    public class GetUserStatsQuery : IRequest<GetUserStatsQueryReponse>
    {
        public Guid UserId { get; set; }
    }
}
