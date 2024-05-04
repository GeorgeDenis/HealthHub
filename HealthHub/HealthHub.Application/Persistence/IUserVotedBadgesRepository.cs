using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IUserVotedBadgesRepository : IAsyncRepository<UserVotedBadges>
    {
        Task<bool> GetUserVotedBadge(Guid voterId, Guid votedId, string type);
    }
}
