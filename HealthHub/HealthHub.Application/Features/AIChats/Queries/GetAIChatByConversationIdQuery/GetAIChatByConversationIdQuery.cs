using MediatR;

namespace HealthHub.Application.Features.AIChats.Queries.GetAIChatByConversationIdQuery
{
    public class GetAIChatByConversationIdQuery : IRequest<GetAIChatByConversationIdQueryResponse>
    {
        public Guid AIConversationId { get; set; }
    }
}
