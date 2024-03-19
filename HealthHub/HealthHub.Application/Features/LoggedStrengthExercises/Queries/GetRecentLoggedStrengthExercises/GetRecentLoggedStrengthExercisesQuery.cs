using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetRecentLoggedStrengthExercises
{
    public class GetRecentLoggedStrengthExercisesQuery : IRequest<GetRecentLoggedStrengthExercisesQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
