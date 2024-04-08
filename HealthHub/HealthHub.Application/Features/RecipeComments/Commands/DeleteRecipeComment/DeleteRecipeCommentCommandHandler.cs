using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Commands.DeleteRecipeComment
{
    public class DeleteRecipeCommentCommandHandler : IRequestHandler<DeleteRecipeCommentCommand, DeleteRecipeCommentCommandResponse>
    {
        private readonly IRecipeCommentRepository recipeCommentRepository;
        public DeleteRecipeCommentCommandHandler(IRecipeCommentRepository recipeCommentRepository)
        {
            this.recipeCommentRepository = recipeCommentRepository;
        }
        public async Task<DeleteRecipeCommentCommandResponse> Handle(DeleteRecipeCommentCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteRecipeCommentCommandValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new DeleteRecipeCommentCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var recipeComment = await recipeCommentRepository.FindByIdAsync(request.CommentId);
            if (!recipeComment.IsSuccess)
            {
                return new DeleteRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = "Recipe comment not found"
                };
            }
            if (recipeComment.Value.UserId != request.UserId)
            {
                return new DeleteRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = "You are not authorized to delete this comment"
                };
            }
            var result = await recipeCommentRepository.DeleteAsync(recipeComment.Value.Id);
            if (!result.IsSuccess)
            {
                return new DeleteRecipeCommentCommandResponse
                {
                    Success = false,
                    Message = "Error deleting recipe comment"
                };
            }
            return new DeleteRecipeCommentCommandResponse
            {
                Success = true,
                Message = "Recipe comment deleted successfully"
            };
        }
    }
}
