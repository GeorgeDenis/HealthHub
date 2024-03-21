using HealthHub.Domain.Entities.Enums;
using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Commands.UpdateLoggedFood
{
    public class UpdateLoggedFoodCommand : IRequest<UpdateLoggedFoodCommandResponse>
    {
        public Guid LoggedFoodId { get; set; }
        public Guid UserId { get; set; }
        public float? ServingSize { get; set; }
        public float? NumberOfServings { get; set; }
        public string? Name { get; set; }
        public int? Calories { get; set; }
        public int? Protein { get; set; }
        public int? Carbohydrates { get; set; }
        public int? Fat { get; set; }
        public MealType? MealType { get; set; }
    }
}
