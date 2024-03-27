using FluentValidation;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.CreateLoggedMeasurements
{
    public class CreateLoggedMeasurementsCommandValidator : AbstractValidator<CreateLoggedMeasurementsCommand>
    {
        public CreateLoggedMeasurementsCommandValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required");
        }

    }
}