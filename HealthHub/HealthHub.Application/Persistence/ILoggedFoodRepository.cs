using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface ILoggedFoodRepository : IAsyncRepository<LoggedFood>
    {
        Task<Result<List<LoggedFoodDto>>> GetByUserIdAndDateAsync(Guid userId, DateTime date);
        Task<Result<List<LoggedFoodDto>>> GetRecentLoggedFoodByUserId(Guid userId);
    }
}
