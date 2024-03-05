using FluentValidation;

namespace HealthHub.Application.Features.LoggedWaterEntries.Commands.UpdateLoggedWater
{
    public class UpdateLoggedWaterCommandValidator : AbstractValidator<UpdateLoggedWaterCommand>
    {
        public UpdateLoggedWaterCommandValidator()
        {
            RuleFor(p => p.LoggedWaterId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.Amount)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
