using MediatR;

namespace HealthHub.Application.Features.Messages.Queries.GetMessagesBetweenUsers
{
    public class GetMessagesBetweenUsersQuery : IRequest<GetMessagesBetweenUsersResponse>
    {
        public Guid User1 { get; set; }
        public Guid User2 { get; set; }
    }
}
