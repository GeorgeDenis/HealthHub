using FluentValidation;

namespace HealthHub.Application.Features.Messages.Commands.CreateMessage
{
    public class CreateMessageCommandValidator : AbstractValidator<CreateMessageCommand>
    {
        public CreateMessageCommandValidator()
        {
            RuleFor(p => p.Sender)
                .NotEmpty().WithMessage("{PropertyName} cannot be empty.")
                .NotNull();

            RuleFor(p => p.Receiver)
                .NotEmpty().WithMessage("{PropertyName} cannot be empty.")
                .NotNull();

            RuleFor(p => p.Content)
                .NotEmpty().WithMessage("{PropertyName} cannot be empty.")
                .NotNull();
        }
    }
}
