using HealthHub.Application.Features.Messages;
using HealthHub.Application.Features.Users.Queries;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IMessageRepository : IAsyncRepository<Message>
    {
        Task<Result<List<MessageDto>>> GetMessagesBetweenUsers(Guid user1, Guid user2);
        Task<Result<List<Guid>>> GetUsersListByMessages(Guid userId);
        Task<int> GetMessagesCountWithDifferentUsers(Guid userId);
    }
}
