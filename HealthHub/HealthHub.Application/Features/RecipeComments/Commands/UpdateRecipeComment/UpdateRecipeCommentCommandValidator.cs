﻿using FluentValidation;

namespace HealthHub.Application.Features.RecipeComments.Commands.UpdateRecipeComment
{
    public class UpdateRecipeCommentCommandValidator : AbstractValidator<UpdateRecipeCommentCommand>
    {
        public UpdateRecipeCommentCommandValidator()
        {
            RuleFor(p => p.Id)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.Comment)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(1000).WithMessage("{PropertyName} must not exceed 1000 characters.");

            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
