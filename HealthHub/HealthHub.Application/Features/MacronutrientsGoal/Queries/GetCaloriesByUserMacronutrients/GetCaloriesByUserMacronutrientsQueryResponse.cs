using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetCaloriesByUserMacronutrients
{
    public class GetCaloriesByUserMacronutrientsQueryResponse : BaseResponse
    {
        public GetCaloriesByUserMacronutrientsQueryResponse() : base()
        {
        }
        public int ProteinQuantity { get; set; }
        public int CarbohydratesQuantity { get; set; }
        public int FatsQuantity { get; set; }

    }
}