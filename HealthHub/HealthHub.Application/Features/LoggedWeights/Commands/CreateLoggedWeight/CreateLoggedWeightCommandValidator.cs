using FluentValidation;

namespace HealthHub.Application.Features.LoggedWeights.Commands.CreateLoggedWeight
{
    public class CreateLoggedWeightCommandValidator : AbstractValidator<CreateLoggedWeightCommand>
    {
        public CreateLoggedWeightCommandValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.Weight)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
