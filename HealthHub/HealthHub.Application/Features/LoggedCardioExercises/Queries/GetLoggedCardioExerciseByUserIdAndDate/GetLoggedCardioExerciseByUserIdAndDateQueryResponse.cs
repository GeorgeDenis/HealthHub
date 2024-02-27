using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseByUserIdAndDate
{
    public class GetLoggedCardioExerciseByUserIdAndDateQueryResponse : BaseResponse
    {
        public GetLoggedCardioExerciseByUserIdAndDateQueryResponse() : base()
        {
        }
        public List<LoggedCardioExerciseDto> LoggedCardioExercises { get; set; }

    }
}