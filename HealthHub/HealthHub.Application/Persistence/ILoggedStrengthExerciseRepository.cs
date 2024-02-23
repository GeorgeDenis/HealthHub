using HealthHub.Application.Features.LoggedStrengthExercises;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface ILoggedStrengthExerciseRepository : IAsyncRepository<LoggedStrengthExercise>
    {
        Task<Result<List<LoggedStrengthExercisesDto>>> GetByUserIdAndDateAsync(Guid userId, DateTime date);
    }
}
