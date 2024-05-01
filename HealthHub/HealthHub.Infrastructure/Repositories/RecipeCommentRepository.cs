using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class RecipeCommentRepository : BaseRepository<RecipeComment>, IRecipeCommentRepository
    {
        public RecipeCommentRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<List<RecipeComment>>> GetByRecipeIdAsync(string recipeId)
        {
            var recipeComments = await context.RecipeComments
                .Where(rc => rc.RecipeId == recipeId)
                .ToListAsync();
            return Result<List<RecipeComment>>.Success(recipeComments);
        }

        public async Task<int> GetCommentsCount(Guid userId)
        {
            var comments = await context.RecipeComments
                .Where(rc => rc.UserId == userId)
                .ToListAsync();
            return comments.Count;
        }
    }
}
