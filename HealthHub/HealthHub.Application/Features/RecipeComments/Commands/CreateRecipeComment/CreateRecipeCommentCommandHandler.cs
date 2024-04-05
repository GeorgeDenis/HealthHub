using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Commands.CreateRecipeComment
{
    public class CreateRecipeCommentCommandHandler : IRequestHandler<CreateRecipeCommentCommand, CreateRecipeCommentCommandResponse>
    {
        private readonly IRecipeCommentRepository recipeCommentRepository;
        public CreateRecipeCommentCommandHandler(IRecipeCommentRepository recipeCommentRepository)
        {
            this.recipeCommentRepository = recipeCommentRepository;
        }
        public async Task<CreateRecipeCommentCommandResponse> Handle(CreateRecipeCommentCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateRecipeCommentCommandValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new CreateRecipeCommentCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            //var recipeSearch = await recipeCommentRepository.FindByIdAsync(request.RecipeId);
            //if (!recipeSearch.IsSuccess)
            //{
            //    return new CreateRecipeCommentCommandResponse
            //    {
            //        Success = false,
            //        Message = "Recipe with this id not found."
            //    };
            //}
            var recipe = RecipeComment.Create(request.RecipeId,request.Comment,request.UserId);
            if (!recipe.IsSuccess)
            {
                return new CreateRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = recipe.Error
                };
            }
            var result = await recipeCommentRepository.AddAsync(recipe.Value);
            if (!result.IsSuccess)
            {
                return new CreateRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = "Error while adding recipe comment."
                };
            }
            return new CreateRecipeCommentCommandResponse
            {
                Success = true
            };
        }
    }
}
