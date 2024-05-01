using HealthHub.Application.Features.EmailMessages.Queries.GetUserData;
using HealthHub.Application.Features.LoggedCardioExercises;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface ILoggedCardioExerciseRepository : IAsyncRepository<LoggedCardioExercise>
    {
        Task<Result<List<LoggedCardioExerciseDto>>> GetByUserIdAndDateAsync(Guid userId, DateTime date);
        Task<Result<List<LoggedCardioExerciseDto>>> GetRecentLoggedCardioExercises(Guid userId);
        Task<Result<List<LoggedCardioExerciseDto>>> GetByUserIdAndDateInterval(Guid userId, DateRange dateRange);
        Task<int> GetLoggedCardioExercisesCount(Guid userId);
    }
}
