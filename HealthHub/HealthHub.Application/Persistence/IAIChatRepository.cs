using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IAIChatRepository : IAsyncRepository<AIChat>
    {
        Task<Result<List<AIChat>>> FindByConversationIdAsync(Guid conversationId);
    }
}
