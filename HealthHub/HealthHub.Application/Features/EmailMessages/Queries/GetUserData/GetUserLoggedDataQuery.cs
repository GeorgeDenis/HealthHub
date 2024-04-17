using MediatR;

namespace HealthHub.Application.Features.EmailMessages.Queries.GetUserData
{
    public class GetUserLoggedDataQuery : IRequest<GetUserLoggedDataQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
