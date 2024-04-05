using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class RecipeComment
    {
        private RecipeComment(string recipeId, string comment, Guid userId)
        {
            Id = Guid.NewGuid();
            RecipeId = recipeId;
            Comment = comment;
            Date = DateTime.UtcNow;
            UserId = userId;
        }
        public RecipeComment()
        {

        }
        public Guid Id { get; set; }
        public string RecipeId { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }



        public static Result<RecipeComment> Create(string recipeId, string comment, Guid userId)
        {
            if (string.IsNullOrWhiteSpace(recipeId))
            {
                return Result<RecipeComment>.Failure("Recipe Id cannot be empty");
            }
            if (userId == Guid.Empty)
            {
                return Result<RecipeComment>.Failure("User Id cannot be empty");
            }
            if (string.IsNullOrWhiteSpace(comment))
            {
                return Result<RecipeComment>.Failure("Comment cannot be empty");
            }
            return Result<RecipeComment>.Success(new RecipeComment(recipeId, comment, userId));
        }
        public Result<RecipeComment> Update(string comment)
        {
            if (string.IsNullOrWhiteSpace(comment))
            {
                return Result<RecipeComment>.Failure("Comment cannot be empty");
            }
            Comment = comment;
            return Result<RecipeComment>.Success(this);
        }
    }
}
