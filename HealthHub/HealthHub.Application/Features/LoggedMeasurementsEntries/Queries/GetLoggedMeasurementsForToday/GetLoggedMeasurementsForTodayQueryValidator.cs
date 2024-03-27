using FluentValidation;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurementsForToday
{
    public class GetLoggedMeasurementsForTodayQueryValidator : AbstractValidator<GetLoggedMeasurementsForTodayQuery>
    {
        public GetLoggedMeasurementsForTodayQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{UserId} is required.")
                .NotNull();
        }
    }
}
