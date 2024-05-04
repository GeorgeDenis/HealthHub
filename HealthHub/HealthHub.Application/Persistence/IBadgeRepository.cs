using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IBadgeRepository : IAsyncRepository<Badge>
    {
        Task<Result<Badge>> GetBadgeByUserIdAndType(Guid userId, string badgeType);
        Task<Result<List<Badge>>> GetBadgesByUserId(Guid userId);
    }
}
