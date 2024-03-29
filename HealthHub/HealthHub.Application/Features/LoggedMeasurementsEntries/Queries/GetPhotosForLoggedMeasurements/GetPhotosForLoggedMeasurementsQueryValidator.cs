using FluentValidation;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetPhotosForLoggedMeasurements
{
    public class GetPhotosForLoggedMeasurementsQueryValidator : AbstractValidator<GetPhotosForLoggedMeasurementsQuery>
    {
        public GetPhotosForLoggedMeasurementsQueryValidator()
        {

            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
