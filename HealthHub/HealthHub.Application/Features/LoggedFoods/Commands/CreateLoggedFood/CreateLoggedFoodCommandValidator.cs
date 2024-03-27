using FluentValidation;

namespace HealthHub.Application.Features.LoggedFoods.Commands.CreateLoggedFood
{
    public class CreateLoggedFoodCommandValidator : AbstractValidator<CreateLoggedFoodCommand>
    {
        public CreateLoggedFoodCommandValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.FoodName)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters.");

            RuleFor(p => p.Calories)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");

            RuleFor(p => p.Protein)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");

            RuleFor(p => p.Carbohydrates)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");

            RuleFor(p => p.Fat)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");
            RuleFor(p => p.MealType)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .IsInEnum().WithMessage("{PropertyName} is not valid.");
            RuleFor(p => p.DateLogged)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotEqual(System.DateTime.MinValue).WithMessage("{PropertyName} is required.");
        }
    }
}
