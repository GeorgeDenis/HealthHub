namespace HealthHub.Application.Features.AIConversations
{
    public class AIConversationDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateSent { get; set; }
    }
}