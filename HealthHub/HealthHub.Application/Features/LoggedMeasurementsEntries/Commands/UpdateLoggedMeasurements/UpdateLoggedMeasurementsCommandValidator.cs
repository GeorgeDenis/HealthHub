using FluentValidation;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.UpdateLoggedMeasurements
{
    public class UpdateLoggedMeasurementsCommandValidator : AbstractValidator<UpdateLoggedMeasurementsCommand>
    {
        public UpdateLoggedMeasurementsCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required");
            RuleFor(x => x.UserId).NotEmpty().WithMessage("Weight is required");
        }
    }
}
