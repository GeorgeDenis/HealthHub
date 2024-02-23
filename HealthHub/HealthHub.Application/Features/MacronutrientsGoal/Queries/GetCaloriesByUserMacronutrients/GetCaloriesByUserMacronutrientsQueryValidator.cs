using FluentValidation;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetCaloriesByUserMacronutrients
{
    public class GetCaloriesByUserMacronutrientsQueryValidator : AbstractValidator<GetCaloriesByUserMacronutrientsQuery>
    {
        public GetCaloriesByUserMacronutrientsQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("User id is required.")
                .NotNull();
            RuleFor(p => p.Calories)
                .NotEmpty().WithMessage("Calories is required.")
                .NotNull();
        }
    }
}
