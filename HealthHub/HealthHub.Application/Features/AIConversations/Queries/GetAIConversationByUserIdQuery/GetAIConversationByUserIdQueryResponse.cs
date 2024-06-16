using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByUserIdQuery
{
    public class GetAIConversationByUserIdQueryResponse : BaseResponse
    {
        public GetAIConversationByUserIdQueryResponse() : base()
        {
        }
        public AIConversationDto[] AIConversationDtos { get; set; }
    }
}