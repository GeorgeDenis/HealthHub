using MediatR;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetCaloriesByUserMacronutrients
{
    public class GetCaloriesByUserMacronutrientsQuery : IRequest<GetCaloriesByUserMacronutrientsQueryResponse>
    {
        public Guid UserId { get; set; } 
        public int Calories { get; set; }
    }
}
