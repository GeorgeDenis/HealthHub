using FluentValidation;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Commands.DeleteLoggedStrengthExercise
{
    public class DeleteLoggedStrengthExerciseCommandValidator : AbstractValidator<DeleteLoggedStrengthExerciseCommand>
    {
        public DeleteLoggedStrengthExerciseCommandValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
