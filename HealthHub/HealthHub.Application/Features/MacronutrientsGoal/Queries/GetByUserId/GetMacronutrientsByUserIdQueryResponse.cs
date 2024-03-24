using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetByUserId
{
    public class GetMacronutrientsByUserIdQueryResponse : BaseResponse
    {
        public GetMacronutrientsByUserIdQueryResponse() : base()
        {
        }
        public MacronutrientsGoalDto MacronutrientsGoalDto { get; set; } = new MacronutrientsGoalDto();
    }
}