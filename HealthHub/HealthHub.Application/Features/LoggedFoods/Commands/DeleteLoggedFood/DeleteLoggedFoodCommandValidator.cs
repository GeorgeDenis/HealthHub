using FluentValidation;

namespace HealthHub.Application.Features.LoggedFoods.Commands.DeleteLoggedFood
{
    public class DeleteLoggedFoodCommandValidator : AbstractValidator<DeleteLoggedFoodCommand>
    {
        public DeleteLoggedFoodCommandValidator()
        {
            RuleFor(p => p.LoggedFoodId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
