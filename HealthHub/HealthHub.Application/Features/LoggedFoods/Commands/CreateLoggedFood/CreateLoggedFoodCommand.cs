using HealthHub.Domain.Entities.Enums;
using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Commands.CreateLoggedFood
{
    public class CreateLoggedFoodCommand : IRequest<CreateLoggedFoodCommandResponse>
    {
        public Guid UserId { get; set; } 
        public string FoodName { get; set; } = string.Empty;
        public float? ServingSize { get; set; }
        public float? NumberOfServings { get; set; }

        public int Calories { get; set; }
        public int Protein { get; set; }
        public int Carbohydrates { get; set; }
        public int Fat { get; set; }
        public MealType MealType { get; set; }
    }
}
