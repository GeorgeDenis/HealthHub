using FluentValidation;

namespace HealthHub.Application.Features.ResetCode.Commands.CreateResetCode
{
    public class CreateResetCodeCommandValidator : AbstractValidator<CreateResetCodeCommand>
    {
        public CreateResetCodeCommandValidator()
        {
            RuleFor(i => i.Email).NotEmpty().NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull();
        }
    }
}
