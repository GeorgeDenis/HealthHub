using HealthHub.Application.Features.LoggedCardioExercises;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface ILoggedCardioExerciseRepository : IAsyncRepository<LoggedCardioExercise>
    {
        Task<Result<List<LoggedCardioExerciseDto>>> GetByUserIdAndDateAsync(Guid userId, DateTime date);
        Task<Result<List<LoggedCardioExerciseDto>>> GetRecentLoggedCardioExercises(Guid userId);
    }
}
