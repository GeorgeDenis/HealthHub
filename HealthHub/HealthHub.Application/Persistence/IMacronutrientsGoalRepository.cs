using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IMacronutrientsGoalRepository : IAsyncRepository<MacronutrientsGoal>
    {
        Task<Result<MacronutrientsGoal>> GetByUserIdAsync(Guid userId);
    }
}
