using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Infrastructure.Repositories
{
    public class BadgeRepository : BaseRepository<Badge>, IBadgeRepository
    {
        public BadgeRepository(HealthHubContext context) : base(context)
        {
        }
        public async Task<Result<Badge>> GetBadgeByUserIdAndType(Guid userId, string badgeType)
        {
            var BadgesByUserIdAndType = context.Badges
                .Where(b => b.UserId == userId && b.Type == badgeType)
                .FirstOrDefault();
            if (BadgesByUserIdAndType == null)
            {
                return Result<Badge>.Failure("Badge not found");
            }
            return Result<Badge>.Success(BadgesByUserIdAndType);
        }

        public Task<Result<List<Badge>>> GetBadgesByUserId(Guid userId)
        {
            var badges = context.Badges
                .Where(b => b.UserId == userId)
                .ToList();
            return Task.FromResult(Result<List<Badge>>.Success(badges));
        }
    }
}
