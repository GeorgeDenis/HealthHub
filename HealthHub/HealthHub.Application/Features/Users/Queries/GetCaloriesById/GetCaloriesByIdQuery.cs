using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetCaloriesById
{
    public class GetCaloriesByIdQuery : IRequest<GetCaloriesByIdQueryResponse>
    {
        public Guid UserId { get; set; } = Guid.Empty;
    }
}
