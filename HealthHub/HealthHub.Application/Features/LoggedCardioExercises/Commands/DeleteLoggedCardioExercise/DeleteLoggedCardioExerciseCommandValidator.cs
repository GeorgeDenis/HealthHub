using FluentValidation;

namespace HealthHub.Application.Features.LoggedCardioExercises.Commands.DeleteLoggedCardioExercise
{
    public class DeleteLoggedCardioExerciseCommandValidator : AbstractValidator<DeleteLoggedCardioExerciseCommand>
    {
        public DeleteLoggedCardioExerciseCommandValidator()
        {
            RuleFor(p => p.Id)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
