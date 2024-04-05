using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Queries.GetRecipeCommentsByRecipeId
{
    public class GetRecipeCommentsByRecipeIdQuery : IRequest<GetRecipeCommentsByRecipeIdResponse>
    {
        public string RecipeId { get; set; }
    }
}
