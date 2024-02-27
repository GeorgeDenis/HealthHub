using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate
{
    public class GetLoggedFoodByUserIdAndDateQuery : IRequest<GetLoggedFoodByUserIdAndDateQueryResponse>
    {
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
