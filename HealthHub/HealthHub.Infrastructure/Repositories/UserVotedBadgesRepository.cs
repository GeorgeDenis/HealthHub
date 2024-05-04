using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;

namespace HealthHub.Infrastructure.Repositories
{
    public class UserVotedBadgesRepository : BaseRepository<UserVotedBadges>, IUserVotedBadgesRepository
    {
        public UserVotedBadgesRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<bool> GetUserVotedBadge(Guid voterId, Guid votedId, string type)
        {
            var vote = context.UserVotedBadges
                .Where(b => b.VoterId == voterId && b.VotedId == votedId && b.Type == type)
                .FirstOrDefault();
            if (vote == null)
            {
                return false;
            }
            return true;
        }
    }
}
