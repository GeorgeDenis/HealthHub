using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class AIChatRepository : BaseRepository<AIChat>, IAIChatRepository
    {
        public AIChatRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<List<AIChat>>> FindByConversationIdAsync(Guid conversationId)
        {
            var aiChats = await context.AIChat.Where(x => x.AiConversationId == conversationId).ToListAsync();
 
            return Result<List<AIChat>>.Success(aiChats);
        }
    }
}
