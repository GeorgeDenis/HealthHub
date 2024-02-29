using FluentValidation;

namespace HealthHub.Application.Features.LoggedWeights.Queries.GetLastLoggedWeightByUserId
{
    public class GetLastLoggedWeightByUserIdQueryValidator : AbstractValidator<GetLastLoggedWeightByUserIdQuery>
    {
        public GetLastLoggedWeightByUserIdQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
