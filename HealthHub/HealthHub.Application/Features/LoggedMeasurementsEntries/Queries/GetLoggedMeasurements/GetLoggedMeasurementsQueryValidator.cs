using FluentValidation;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurements
{
    public class GetLoggedMeasurementsQueryValidator : AbstractValidator<GetLoggedMeasurementsQuery>
    {
        public GetLoggedMeasurementsQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{UserId} is required.")
                .NotNull();
        }

    }

}
