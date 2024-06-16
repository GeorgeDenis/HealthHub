using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Infrastructure.Repositories
{
    public class AIConversationRepository: BaseRepository<AIConversation>, IAIConversationRepository
    {
        public AIConversationRepository(HealthHubContext context) : base(context)
        {
        }

        public  Task<Result<List<AIConversation>>> GetByUserIdAsync(Guid userId)
        {
            var conversations = context.AIConversation
                .Where(c => c.UserId == userId)
                .ToList();

            return Task.FromResult(Result<List<AIConversation>>.Success(conversations));

        }
    }
}
