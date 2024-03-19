using FluentValidation;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetRecentLoggedStrengthExercises
{
    public class GetRecentLoggedStrengthExercisesQueryValidator : AbstractValidator<GetRecentLoggedStrengthExercisesQuery>
    {
        public GetRecentLoggedStrengthExercisesQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
