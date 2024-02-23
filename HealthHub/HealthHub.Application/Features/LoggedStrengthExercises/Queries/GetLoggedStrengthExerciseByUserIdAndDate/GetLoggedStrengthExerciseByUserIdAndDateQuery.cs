using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetLoggedStrengthExerciseByUserIdAndDate
{
    public class GetLoggedStrengthExerciseByUserIdAndDateQuery : IRequest<GetLoggedStrengthExerciseByUserIdAndDateQueryResponse>
    {
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
