using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.RecipeComments.Queries.GetRecipeCommentsByRecipeId
{
    public class GetRecipeCommentsByRecipeIdResponse : BaseResponse
    {
        public GetRecipeCommentsByRecipeIdResponse() : base()
        {
        }
        public List<RecipeCommentDto> RecipeComments { get; set; }
    }
}