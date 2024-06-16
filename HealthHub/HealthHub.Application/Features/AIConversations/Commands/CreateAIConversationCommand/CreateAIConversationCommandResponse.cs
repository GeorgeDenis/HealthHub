using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.AIConversations.Commands.CreateAIConversationCommand
{
    public class CreateAIConversationCommandResponse : BaseResponse
    {
        public CreateAIConversationCommandResponse() : base()
        {
        }

        public Guid Id { get; set; }
    }

}