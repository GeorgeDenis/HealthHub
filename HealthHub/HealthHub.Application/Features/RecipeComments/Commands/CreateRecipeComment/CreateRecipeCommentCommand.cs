using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Commands.CreateRecipeComment
{
    public class CreateRecipeCommentCommand : IRequest<CreateRecipeCommentCommandResponse>
    {
        public Guid UserId { get; set; } 
        public string RecipeId { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
    }
}
