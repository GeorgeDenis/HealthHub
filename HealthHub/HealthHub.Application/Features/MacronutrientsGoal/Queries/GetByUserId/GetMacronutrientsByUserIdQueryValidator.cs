using FluentValidation;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetByUserId
{
    public class GetMacronutrientsByUserIdQueryValidator : AbstractValidator<GetMacronutrientsByUserIdQuery>
    {
        public GetMacronutrientsByUserIdQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("User id is required.")
                .NotNull();
        }
    }
}
