using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetRecentLoggedCardioExercises
{
    public class GetRecentLoggedCardioExercisesQueryResponse : BaseResponse
    {
        public GetRecentLoggedCardioExercisesQueryResponse() : base()
        {
        }



        public List<LoggedCardioExerciseDto> LoggedCardioExercises { get; set; }
    }
}