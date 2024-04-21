using HealthHub.Application.Features.Messages;
using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class MessageRepository : BaseRepository<Message>, IMessageRepository
    {
        public MessageRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<List<MessageDto>>> GetMessagesBetweenUsers(Guid user1, Guid user2)
        {
            var messages = await context.Messages
                .Where(m => (m.Sender == user1 && m.Receiver == user2) || (m.Sender == user2 && m.Receiver == user1))
                .OrderBy(m => m.DateSent)
                .Select(m => new MessageDto
                {
                    Id = m.MessageId,
                    Sender = m.Sender,
                    Receiver = m.Receiver,
                    Content = m.Content,
                    Date = m.DateSent
                })
                .ToListAsync();
            return Result<List<MessageDto>>.Success(messages);
        }

        public async Task<Result<List<Guid>>> GetUsersListByMessages(Guid userId)
        {
            var users = await context.Messages
                .Where(m => m.Sender == userId || m.Receiver == userId)
                .Select(m => m.Sender == userId ? m.Receiver : m.Sender)
                .Distinct()
                .ToListAsync();
            return Result<List<Guid>>.Success(users);
        }
    }
}
