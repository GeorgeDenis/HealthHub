using FluentValidation;

namespace HealthHub.Application.Features.RecipeComments.Commands.DeleteRecipeComment
{
    public class DeleteRecipeCommentCommandValidator : AbstractValidator<DeleteRecipeCommentCommand>
    {
        public DeleteRecipeCommentCommandValidator()
        {
            RuleFor(p => p.CommentId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
