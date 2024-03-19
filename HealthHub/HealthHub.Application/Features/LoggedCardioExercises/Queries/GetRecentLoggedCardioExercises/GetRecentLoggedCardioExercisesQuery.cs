using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetRecentLoggedCardioExercises
{
    public class GetRecentLoggedCardioExercisesQuery : IRequest<GetRecentLoggedCardioExercisesQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
