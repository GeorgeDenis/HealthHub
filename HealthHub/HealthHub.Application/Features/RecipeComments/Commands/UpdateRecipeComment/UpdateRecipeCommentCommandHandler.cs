using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Commands.UpdateRecipeComment
{
    public class UpdateRecipeCommentCommandHandler : IRequestHandler<UpdateRecipeCommentCommand, UpdateRecipeCommentCommandResponse>
    {
        private readonly IRecipeCommentRepository recipeCommentRepository;
        public UpdateRecipeCommentCommandHandler(IRecipeCommentRepository recipeCommentRepository)
        {
            this.recipeCommentRepository = recipeCommentRepository;
        }
        public async Task<UpdateRecipeCommentCommandResponse> Handle(UpdateRecipeCommentCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateRecipeCommentCommandValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new UpdateRecipeCommentCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var recipeComment = await recipeCommentRepository.FindByIdAsync(request.Id);
            if (!recipeComment.IsSuccess)
            {
                return new UpdateRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = "Recipe comment not found"
                };
            }
            if (recipeComment.Value.UserId != request.UserId)
            {
                return new UpdateRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = "You are not authorized to update this comment"
                };
            }
            var recipeUpdated = recipeComment.Value.Update(request.Comment);
            if (!recipeUpdated.IsSuccess)
            {
                return new UpdateRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = "An error occurred while updating the recipe comment"
                };
            }
            var updateResponse = await recipeCommentRepository.UpdateAsync(recipeComment.Value);
            if (!updateResponse.IsSuccess)
            {
                return new UpdateRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = "An error occurred while updating the recipe comment"
                };
            }
            return new UpdateRecipeCommentCommandResponse
            {
                Success = true,
                Message = "Recipe comment updated successfully"
            };
        }
    }
}
