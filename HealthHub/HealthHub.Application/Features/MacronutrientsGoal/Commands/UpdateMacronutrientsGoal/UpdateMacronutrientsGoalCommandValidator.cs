using FluentValidation;

namespace HealthHub.Application.Features.MacronutrientsGoal.Commands.UpdateMacronutrientsGoal
{
    public class UpdateMacronutrientsGoalCommandValidator : AbstractValidator<UpdateMacronutrientsGoalCommand>
    {
        public UpdateMacronutrientsGoalCommandValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
