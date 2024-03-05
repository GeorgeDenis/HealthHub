using FluentValidation;

namespace HealthHub.Application.Features.LoggedWaterEntries.Queries.GetLoggedWaterByUserIdAndDate
{
    public class GetLoggedWaterByUserIdAndDateQueryValidator : AbstractValidator<GetLoggedWaterByUserIdAndDateQuery>
    {
        public GetLoggedWaterByUserIdAndDateQueryValidator()
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
