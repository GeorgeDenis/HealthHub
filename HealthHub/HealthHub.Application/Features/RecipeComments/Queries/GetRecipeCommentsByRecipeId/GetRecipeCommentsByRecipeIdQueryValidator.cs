using FluentValidation;

namespace HealthHub.Application.Features.RecipeComments.Queries.GetRecipeCommentsByRecipeId
{
    public class GetRecipeCommentsByRecipeIdQueryValidator : AbstractValidator<GetRecipeCommentsByRecipeIdQuery>
    {
        public GetRecipeCommentsByRecipeIdQueryValidator()
        {
            RuleFor(p => p.RecipeId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters.");
        }
    }
}
