using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodNutritentsByUserIdAndDate
{
    public class GetLoggedFoodNutritentsByUserIdAndDateQuery : IRequest<GetLoggedFoodNutritentsByUserIdAndDateQueryResponse>
    {
        public Guid UserId { get; set; }
        public DateTime DateLogged { get; set; }
    }
}
