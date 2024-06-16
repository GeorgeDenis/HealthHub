using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByIdQuery
{
    public class GetAIConversationByIdQueryResponse : BaseResponse
    {
        public GetAIConversationByIdQueryResponse() : base()
        {
        }

       public AIConversationDto AIConversation { get; set; }

    }
}