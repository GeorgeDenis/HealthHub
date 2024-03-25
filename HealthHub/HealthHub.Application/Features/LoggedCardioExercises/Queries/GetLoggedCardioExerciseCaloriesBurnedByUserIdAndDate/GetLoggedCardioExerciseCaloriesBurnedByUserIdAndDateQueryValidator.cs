using FluentValidation;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDate
{
    public class GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryValidator : AbstractValidator<GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQuery>
    {
        public GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
            RuleFor(p => p.DateLogged)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }

}
