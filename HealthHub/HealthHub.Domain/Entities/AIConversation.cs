using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class AIConversation
    {
        private AIConversation(Guid userId, string name)
        {
            AIConversationId = Guid.NewGuid();
            UserId = userId;
            Name = name;
            DateSent = DateTime.UtcNow;
        }
        public AIConversation()
        {
        }
        public Guid AIConversationId { get; private set; }
        public Guid UserId { get; private set; }
        public string Name { get; private set; }
        public DateTime DateSent { get; private set; }

        public static Result<AIConversation> Create(Guid userId, string name)
        {
            if (userId == Guid.Empty)
            {
                return Result<AIConversation>.Failure("User ID cannot be empty");
            }
            if (string.IsNullOrWhiteSpace(name))
            {
                return Result<AIConversation>.Failure("Name cannot be empty");
            }

            return Result<AIConversation>.Success(new AIConversation(userId, name));
        }
    }
}
