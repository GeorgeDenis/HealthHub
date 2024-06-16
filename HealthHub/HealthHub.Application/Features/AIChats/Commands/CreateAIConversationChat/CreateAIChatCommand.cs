using HealthHub.Application.Features.AIConversations.Commands.CreateAIConversationCommand;
using MediatR;

namespace HealthHub.Application.Features.AIChats.Commands.CreateAIConversationChat
{
    public class CreateAIChatCommand : IRequest<CreateAIChatCommandResponse>
    {
        public Guid AIConversationId { get; set; }
        public Guid UserId { get; set; }
        public string Sender { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
