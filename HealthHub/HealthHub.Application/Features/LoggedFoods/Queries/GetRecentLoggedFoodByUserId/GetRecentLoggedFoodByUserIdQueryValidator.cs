using FluentValidation;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetRecentLoggedFoodByUserId
{
    public class GetRecentLoggedFoodByUserIdQueryValidator : AbstractValidator<GetRecentLoggedFoodByUserIdQuery>
    {
        public GetRecentLoggedFoodByUserIdQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }

}
