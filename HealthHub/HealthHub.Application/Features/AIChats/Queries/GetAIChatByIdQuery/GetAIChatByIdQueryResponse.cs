using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.AIChats.Queries.GetAIChatByIdQuery
{
    public class GetAIChatByIdQueryResponse : BaseResponse
    {
        public GetAIChatByIdQueryResponse() : base()
        {
        }

        public AIChatDto AiChat { get; set; }

    }
}