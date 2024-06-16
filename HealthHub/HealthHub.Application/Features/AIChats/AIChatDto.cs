namespace HealthHub.Application.Features.AIChats
{
    public class AIChatDto
    {
        public Guid Id { get; set; }
        public Guid AIConversationId { get; set; }
        public Guid UserId { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Sender { get; set; } = string.Empty;


        public DateTime CreatedOn { get; set; }
    }
}