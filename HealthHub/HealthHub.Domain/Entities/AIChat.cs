using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class AIChat
    {
        private AIChat(Guid userId, string message,string sender, Guid aiConversationId)
        {
            AiChatId = Guid.NewGuid();
            AiConversationId = aiConversationId;
            UserId = userId;
            Message = message;
            Sender = sender;
            DateSent = DateTime.UtcNow;
        }
        public AIChat()
        {
        }
        public Guid AiChatId { get; private set; }
        public Guid UserId { get; private set; }
        public string Message { get; private set; }
        public string Sender { get; private set; }
        public DateTime DateSent { get; private set; }
        public Guid AiConversationId { get; private set; }

        public static Result<AIChat> Create(Guid userId, string message,string sender,Guid aiConversationId)
        {
            if (userId == Guid.Empty)
            {
                return Result<AIChat>.Failure("User ID cannot be empty");
            }
            if (aiConversationId == Guid.Empty)
            {
                return Result<AIChat>.Failure("AI Conversation ID cannot be empty");
            }
            if(string.IsNullOrWhiteSpace(sender))
            {
                return Result<AIChat>.Failure("Sender cannot be empty");
            }
            if (string.IsNullOrWhiteSpace(message))
            {
                return Result<AIChat>.Failure("Message cannot be empty");
            }
            return Result<AIChat>.Success(new AIChat(userId, message,sender,aiConversationId));
        }
    }
}
