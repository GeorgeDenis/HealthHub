using FluentValidation;

namespace HealthHub.Application.Features.AIChats.Commands.CreateAIConversationChat
{
    public class CreateAIChatCommandValidator : AbstractValidator<CreateAIChatCommand>
    {
        public CreateAIChatCommandValidator()
        {
            RuleFor(p => p.AIConversationId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.Message)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
