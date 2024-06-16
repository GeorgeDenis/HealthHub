using MediatR;

namespace HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByIdQuery
{
    public class GetAIConversationByIdQuery : IRequest<GetAIConversationByIdQueryResponse>
    {
        public Guid Id { get; set; }
    }
}
