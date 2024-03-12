using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetRecentLoggedFoodByUserId
{
    public class GetRecentLoggedFoodByUserIdQuery : IRequest<GetRecentLoggedFoodByUserIdQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
