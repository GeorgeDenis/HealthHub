using FluentValidation;

namespace HealthHub.Application.Features.LoggedWeights.Queries.GetLoggedWeightByUserId
{
    public class GetLoggedWeightByUserIdQueryValidator : AbstractValidator<GetLoggedWeightByUserIdQuery>
    {
        public GetLoggedWeightByUserIdQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
