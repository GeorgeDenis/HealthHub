using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class MacronutrientsGoalRepository : BaseRepository<MacronutrientsGoal>, IMacronutrientsGoalRepository
    {
        public MacronutrientsGoalRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<MacronutrientsGoal>> GetByUserIdAsync(Guid userId)
        {
            var macronutrientsGoal = await context.MacronutrientsGoals
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync();
            if (macronutrientsGoal == null)
            {
                return Result<MacronutrientsGoal>.Failure("No macronutrients goal found for this user");
            }
            return Result<MacronutrientsGoal>.Success(macronutrientsGoal);
        }
    }
}
