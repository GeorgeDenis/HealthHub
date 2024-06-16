using MediatR;

namespace HealthHub.Application.Features.AIChats.Queries.GetAIChatByIdQuery
{
    public class GetAIChatByIdQuery : IRequest<GetAIChatByIdQueryResponse>
    {
        public Guid Id { get; set; }
    }
}
