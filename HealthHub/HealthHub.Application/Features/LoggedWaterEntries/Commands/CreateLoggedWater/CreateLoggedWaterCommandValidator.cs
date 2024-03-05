using FluentValidation;

namespace HealthHub.Application.Features.LoggedWaterEntries.Commands.CreateLoggedWater
{
    public class CreateLoggedWaterCommandValidator : AbstractValidator<CreateLoggedWaterCommand>
    {
        public CreateLoggedWaterCommandValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.Amount)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");
        }
    }
}
