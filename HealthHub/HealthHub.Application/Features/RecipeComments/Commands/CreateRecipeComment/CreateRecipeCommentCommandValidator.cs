using FluentValidation;

namespace HealthHub.Application.Features.RecipeComments.Commands.CreateRecipeComment
{
    public class CreateRecipeCommentCommandValidator : AbstractValidator<CreateRecipeCommentCommand>
    {
        public CreateRecipeCommentCommandValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{UserId} is required.")
                .NotNull();

            RuleFor(p => p.RecipeId)
                .NotEmpty().WithMessage("{RecipeId} is required.")
                .NotNull();

            RuleFor(p => p.Comment)
                .NotEmpty().WithMessage("{Comment} is required.")
                .NotNull();
        }
    }

}
