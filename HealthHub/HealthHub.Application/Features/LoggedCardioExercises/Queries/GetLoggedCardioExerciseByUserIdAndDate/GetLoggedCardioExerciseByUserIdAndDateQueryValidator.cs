using FluentValidation;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseByUserIdAndDate
{
    public class GetLoggedCardioExerciseByUserIdAndDateQueryValidator : AbstractValidator<GetLoggedCardioExerciseByUserIdAndDateQuery>
    {
        public GetLoggedCardioExerciseByUserIdAndDateQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{UserId} is required.")
                .NotNull();
            RuleFor(p => p.Date)
                .NotEmpty().WithMessage("{Date} is required.")
                .NotNull();
        }
    }
}
