using FluentValidation;

namespace HealthHub.Application.Features.Badges.Commands.UpdateSpecialBadge
{
    public class UpdateSpecialBadgeCommandValidator : AbstractValidator<UpdateSpecialBadgeCommand>
    {
        public UpdateSpecialBadgeCommandValidator()
        {
            RuleFor(p => p.VotedId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
            RuleFor(p => p.Type)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(x => x == "Challenge-Leader" || x == "Community-Champ" || x == "Friendly-Spirit" || x == "Consistency");
        }
    }
}
