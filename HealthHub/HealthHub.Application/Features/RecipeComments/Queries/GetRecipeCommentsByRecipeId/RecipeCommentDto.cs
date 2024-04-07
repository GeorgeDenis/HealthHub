using Newtonsoft.Json;

namespace HealthHub.Application.Features.RecipeComments.Queries.GetRecipeCommentsByRecipeId
{
    public class RecipeCommentDto
    {
        public Guid Id { get; set; }
        public string RecipeId { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public CommentCreatedBy CreatedBy { get; set; }

    }
}