using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.AIChats.Queries.GetAIChatByConversationIdQuery
{
    public class GetAIChatByConversationIdQueryResponse : BaseResponse
    {
        public GetAIChatByConversationIdQueryResponse()
        {
        }

        public List<AIChatDto> AIChats { get; set; }
    }
}