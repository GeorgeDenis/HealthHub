using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDate
{
    public class GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQuery : IRequest<GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryResponse>
    {
        public Guid UserId { get; set; }
        public DateTime DateLogged { get; set; }

    }
}
