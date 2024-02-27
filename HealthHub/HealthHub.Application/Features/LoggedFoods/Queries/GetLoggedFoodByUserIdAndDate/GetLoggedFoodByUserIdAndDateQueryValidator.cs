using FluentValidation;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate
{
    public class GetLoggedFoodByUserIdAndDateQueryValidator : AbstractValidator<GetLoggedFoodByUserIdAndDateQuery>
    {
        public GetLoggedFoodByUserIdAndDateQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.Date)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
