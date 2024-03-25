using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDate
{
    public class GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryResponse : BaseResponse
    {
        public GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryResponse() : base()
        {
        }
        public int CaloriesBurned { get; set; }
    }
}