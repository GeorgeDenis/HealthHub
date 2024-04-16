using MediatR;

namespace HealthHub.Application.Features.EmailMessages.Queries.GetUserData
{
    public class GetUserLoggedFoodDataQuery : IRequest<GetUserLoggedFoodDataQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
