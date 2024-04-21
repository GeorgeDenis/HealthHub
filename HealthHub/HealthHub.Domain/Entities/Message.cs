using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class Message
    {
        public Guid MessageId { get; private set; } 
        public Guid Sender { get; private set; }
        public Guid Receiver { get; private set; }
        public string Content { get; private set; }
        public DateTime DateSent { get; private set; }

        private Message(Guid sender, Guid receiver, string content)
        {
            MessageId = Guid.NewGuid();
            Sender = sender;
            Receiver = receiver;
            Content = content;
            DateSent = DateTime.UtcNow;
        }
        public Message() { }

        public static Result<Message> Create(Guid sender, Guid receiver, string content)
        {
            if (sender == Guid.Empty)
            {
                return Result<Message>.Failure("Sender ID cannot be empty");              
            }
            if (receiver == Guid.Empty)
            {
                return Result<Message>.Failure("Receiver ID cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(content))
            {
                return Result<Message>.Failure("Content cannot be empty");
            }

            return Result<Message>.Success(new Message(sender, receiver, content));
        }
    }
}
