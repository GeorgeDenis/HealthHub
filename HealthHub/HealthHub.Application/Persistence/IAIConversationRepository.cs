using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IAIConversationRepository : IAsyncRepository<AIConversation>
    {
        Task<Result<List<AIConversation>>> GetByUserIdAsync(Guid userId);
    }
}
