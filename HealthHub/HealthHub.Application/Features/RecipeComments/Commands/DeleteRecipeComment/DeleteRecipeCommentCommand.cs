using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Commands.DeleteRecipeComment
{
    public class DeleteRecipeCommentCommand : IRequest<DeleteRecipeCommentCommandResponse>
    {
        public Guid CommentId { get; set; }
        public Guid UserId { get; set; }
    }
}
