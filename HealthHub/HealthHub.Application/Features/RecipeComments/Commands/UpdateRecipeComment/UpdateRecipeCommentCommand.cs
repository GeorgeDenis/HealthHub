using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Commands.UpdateRecipeComment
{
    public class UpdateRecipeCommentCommand : IRequest<UpdateRecipeCommentCommandResponse>
    {
        public Guid Id { get; set; }
        public string Comment { get; set; } = string.Empty;
        public Guid UserId { get; set; }
    }
}
