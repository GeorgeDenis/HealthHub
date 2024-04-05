using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IRecipeCommentRepository : IAsyncRepository<RecipeComment>
    {
        Task<Result<List<RecipeComment>>> GetByRecipeIdAsync(string recipeId);
    }
}
