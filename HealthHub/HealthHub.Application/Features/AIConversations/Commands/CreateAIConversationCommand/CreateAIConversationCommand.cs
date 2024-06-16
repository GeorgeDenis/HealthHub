using MediatR;

namespace HealthHub.Application.Features.AIConversations.Commands.CreateAIConversationCommand
{
    public class CreateAIConversationCommand : IRequest<CreateAIConversationCommandResponse>
    {
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
