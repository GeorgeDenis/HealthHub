namespace HealthHub.Application.Features.Messages
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public Guid Sender { get; set; }
        public Guid Receiver { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}