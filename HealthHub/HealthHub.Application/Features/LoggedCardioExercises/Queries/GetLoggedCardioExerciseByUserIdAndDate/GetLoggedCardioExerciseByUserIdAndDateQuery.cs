using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseByUserIdAndDate
{
    public class GetLoggedCardioExerciseByUserIdAndDateQuery : IRequest<GetLoggedCardioExerciseByUserIdAndDateQueryResponse>
    {
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
