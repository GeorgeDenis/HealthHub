using FluentValidation;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetLoggedStrengthExerciseByUserIdAndDate
{
    public class GetLoggedStrengthExerciseByUserIdAndDateQueryValidator : AbstractValidator<GetLoggedStrengthExerciseByUserIdAndDateQuery>
    {
        public GetLoggedStrengthExerciseByUserIdAndDateQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
            RuleFor(p => p.Date)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
