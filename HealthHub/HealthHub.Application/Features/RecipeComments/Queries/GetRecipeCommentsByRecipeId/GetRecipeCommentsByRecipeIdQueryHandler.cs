using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Queries.GetRecipeCommentsByRecipeId
{
    public class GetRecipeCommentsByRecipeIdQueryHandler : IRequestHandler<GetRecipeCommentsByRecipeIdQuery, GetRecipeCommentsByRecipeIdResponse>
    {
        private readonly IRecipeCommentRepository recipeCommentRepository;
        public GetRecipeCommentsByRecipeIdQueryHandler(IRecipeCommentRepository recipeCommentRepository)
        {
            this.recipeCommentRepository = recipeCommentRepository;
        }
        public async Task<GetRecipeCommentsByRecipeIdResponse> Handle(GetRecipeCommentsByRecipeIdQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetRecipeCommentsByRecipeIdQueryValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new GetRecipeCommentsByRecipeIdResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var result = await recipeCommentRepository.GetByRecipeIdAsync(request.RecipeId);
            if (!result.IsSuccess)
            {
                return new GetRecipeCommentsByRecipeIdResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "An error occurred while fetching recipe comments" }
                };
            }
            return new GetRecipeCommentsByRecipeIdResponse
            {
                Success = true,
                RecipeComments = new List<RecipeCommentDto>(result.Value.Select(rc => new RecipeCommentDto
                {
                    Id = rc.Id,
                    RecipeId = rc.RecipeId,
                    Comment = rc.Comment,
                    Created = rc.Date,
                    UserId = rc.UserId
                }))
            };
        }
    }
}
