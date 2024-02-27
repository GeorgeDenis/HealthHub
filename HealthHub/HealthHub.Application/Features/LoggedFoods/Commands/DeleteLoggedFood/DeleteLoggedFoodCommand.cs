using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Commands.DeleteLoggedFood
{
    public class DeleteLoggedFoodCommand : IRequest<DeleteLoggedFoodCommandResponse>
    {
        public Guid LoggedFoodId { get; set; }
        public Guid UserId { get; set; }
    }
}
