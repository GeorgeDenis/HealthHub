using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.AIChats.Commands.CreateAIConversationChat
{
    public class CreateAIChatCommandResponse : BaseResponse
    {
        public CreateAIChatCommandResponse() : base()
        {
        }

        public Guid Id { get; set; }
    }
}