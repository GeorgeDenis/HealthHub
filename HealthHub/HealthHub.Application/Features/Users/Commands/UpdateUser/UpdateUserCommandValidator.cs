using FluentValidation;

namespace HealthHub.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
    {
        public UpdateUserCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Id is required")
                .NotNull().WithMessage("Id is required");

            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Username is required")
                .NotNull().WithMessage("Username is required");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .NotNull().WithMessage("Name is required");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .NotNull().WithMessage("Email is required");
            RuleFor(x => x.Gender)
                .IsInEnum().WithMessage("Gender must be either male or female");
            RuleFor(x => x.Activity)
                .IsInEnum().WithMessage("Activity level must be either sedentary, light, moderate, active, or very active");
            RuleFor(x => x.GoalType)
                .IsInEnum().WithMessage("Goal type must be either lose, maintain, or gain");


            RuleFor(x => x.Bio)
                .MaximumLength(2000);
        }
    }
}
