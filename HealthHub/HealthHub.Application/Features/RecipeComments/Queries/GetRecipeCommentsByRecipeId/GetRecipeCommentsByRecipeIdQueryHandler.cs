using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.RecipeComments.Queries.GetRecipeCommentsByRecipeId
{
    public class GetRecipeCommentsByRecipeIdQueryHandler : IRequestHandler<GetRecipeCommentsByRecipeIdQuery, GetRecipeCommentsByRecipeIdResponse>
    {
        private readonly IRecipeCommentRepository recipeCommentRepository;
        private readonly IUserManager userRepository;
        public GetRecipeCommentsByRecipeIdQueryHandler(IRecipeCommentRepository recipeCommentRepository, IUserManager userRepository)
        {
            this.recipeCommentRepository = recipeCommentRepository;
            this.userRepository = userRepository;
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
            var recipeComments = new List<RecipeCommentDto>();

            foreach (var rc in result.Value)
            {
                var commentUser = await userRepository.FindByIdAsync(rc.UserId);

                recipeComments.Add(new RecipeCommentDto
                {
                    Id = rc.Id,
                    CreatedBy = new CommentCreatedBy
                    {
                        Name = commentUser.Value.Name,
                        ProfilePhotoUrl = commentUser.Value.ProfilePictureUrl
                    },
                    RecipeId = rc.RecipeId,
                    Comment = rc.Comment,
                    CreatedDate = rc.Date,
                    UserId = rc.UserId
                });
            }

            return new GetRecipeCommentsByRecipeIdResponse
            {
                Success = true,
                RecipeComments = recipeComments
            };

        }
    }
}
