using MediatR;

namespace HealthHub.Application.Features.Messages.Commands.CreateMessage
{
    public class CreateMessageCommand : IRequest<CreateMessageCommandResponse>
    {
        public Guid Sender { get; set; }
        public Guid Receiver { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
