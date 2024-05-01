using HealthHub.Application.Features.EmailMessages.Queries.GetUserData;
using HealthHub.Application.Features.LoggedCardioExercises;
using HealthHub.Application.Features.LoggedStrengthExercises;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface ILoggedStrengthExerciseRepository : IAsyncRepository<LoggedStrengthExercise>
    {
        Task<Result<List<LoggedStrengthExerciseDto>>> GetByUserIdAndDateAsync(Guid userId, DateTime date);
        Task<Result<List<LoggedStrengthExerciseDto>>> GetRecentLoggedStrengthExercises(Guid userId);
        Task<Result<List<LoggedStrengthExerciseDto>>> GetByUserIdAndDateInterval(Guid userId, DateRange dateRange);
        Task<int> GetLoggedStrengthExercisesCount(Guid userId);

    }
}
