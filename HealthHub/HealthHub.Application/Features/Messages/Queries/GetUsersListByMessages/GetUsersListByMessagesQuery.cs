using MediatR;

namespace HealthHub.Application.Features.Messages.Queries.GetUsersListByMessages
{
    public class GetUsersListByMessagesQuery : IRequest<GetUsersListByMessagesQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
