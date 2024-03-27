using FluentValidation;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Commands.CreateLoggedStrengthExercise
{
    public class CreateLoggedStrengthExerciseCommandValidator : AbstractValidator<CreateLoggedStrengthExerciseCommand>
    {
        public CreateLoggedStrengthExerciseCommandValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.Name)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.MuscleGroup)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.NumberOfSets)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.WeightPerSet)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
            RuleFor(p => p.DateLogged)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotEqual(System.DateTime.MinValue).WithMessage("{PropertyName} is required.");
        }
    }
}
