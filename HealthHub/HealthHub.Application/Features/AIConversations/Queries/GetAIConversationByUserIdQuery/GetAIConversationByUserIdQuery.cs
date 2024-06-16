using MediatR;

namespace HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByUserIdQuery
{
    public class GetAIConversationByUserIdQuery : IRequest<GetAIConversationByUserIdQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
