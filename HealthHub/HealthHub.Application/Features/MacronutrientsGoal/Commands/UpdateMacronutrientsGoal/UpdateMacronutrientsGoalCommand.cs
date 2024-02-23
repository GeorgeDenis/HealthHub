using MediatR;

namespace HealthHub.Application.Features.MacronutrientsGoal.Commands.UpdateMacronutrientsGoal
{
    public class UpdateMacronutrientsGoalCommand : IRequest<UpdateMacronutrientsGoalCommandResponse>
    {
        public Guid UserId { get; set; }
        public int? Protein { get; set; }
        public int? Carbohydrates { get; set; }
        public int? Fat { get; set; }
    }
}
