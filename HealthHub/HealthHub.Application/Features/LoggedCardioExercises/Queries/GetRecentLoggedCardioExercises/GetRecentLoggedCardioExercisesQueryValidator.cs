using FluentValidation;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetRecentLoggedCardioExercises
{
    public class GetRecentLoggedCardioExercisesQueryValidator : AbstractValidator<GetRecentLoggedCardioExercisesQuery>
    {
        public GetRecentLoggedCardioExercisesQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
