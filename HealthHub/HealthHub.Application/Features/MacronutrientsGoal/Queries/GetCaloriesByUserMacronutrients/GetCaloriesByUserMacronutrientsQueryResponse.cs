using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetCaloriesByUserMacronutrients
{
    public class GetCaloriesByUserMacronutrientsQueryResponse : BaseResponse
    {
        public GetCaloriesByUserMacronutrientsQueryResponse() : base()
        {
        }
        public int ProteinCalories { get; set; }
        public int CarbohydratesCalories { get; set; }
        public int FatsCalories { get; set; }

    }
}