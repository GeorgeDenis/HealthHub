using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface ILoggedWaterRepository : IAsyncRepository<LoggedWater>
    {
        Task<LoggedWater> GetByUserIdAndDate(Guid userId, DateTime date);
    }
}
