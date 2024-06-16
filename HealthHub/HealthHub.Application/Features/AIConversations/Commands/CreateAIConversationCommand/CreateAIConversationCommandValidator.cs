using FluentValidation;

namespace HealthHub.Application.Features.AIConversations.Commands.CreateAIConversationCommand
{
    public class CreateAIConversationCommandValidator : AbstractValidator<CreateAIConversationCommand>
    {
        public CreateAIConversationCommandValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} must not exceed 50 characters.");
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
