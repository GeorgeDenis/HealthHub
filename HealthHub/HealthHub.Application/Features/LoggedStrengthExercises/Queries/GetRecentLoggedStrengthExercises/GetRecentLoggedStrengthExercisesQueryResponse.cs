using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetRecentLoggedStrengthExercises
{
    public class GetRecentLoggedStrengthExercisesQueryResponse : BaseResponse
    {
        public GetRecentLoggedStrengthExercisesQueryResponse() : base()
        {
        }
        public List<LoggedStrengthExerciseDto> LoggedStrengthExercises { get; set; } = [];

    }
}