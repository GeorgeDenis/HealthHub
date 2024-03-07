using FluentValidation;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodNutritentsByUserIdAndDate
{
    public class GetLoggedFoodNutritentsByUserIdAndDateQueryValidator : AbstractValidator<GetLoggedFoodNutritentsByUserIdAndDateQuery>
    {
        public GetLoggedFoodNutritentsByUserIdAndDateQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
            RuleFor(p => p.DateLogged)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
