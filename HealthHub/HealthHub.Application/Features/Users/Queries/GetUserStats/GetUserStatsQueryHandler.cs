using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetUserStats
{

    public class GetUserStatsQueryHandler : IRequestHandler<GetUserStatsQuery, GetUserStatsQueryReponse>
    {
        private readonly IUserManager userManager;
        private readonly ILoggedFoodRepository loggedFoodRepository;
        private readonly ILoggedWaterRepository loggedWaterRepository;
        private readonly IRecipeCommentRepository recipeCommentRepository;
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        private readonly ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository;
        private readonly IMessageRepository messageRepository;
        private readonly ILoggedMeasurementsRepository loggedMeasurementsRepository;
        public GetUserStatsQueryHandler(IUserManager userManager, ILoggedFoodRepository loggedFoodRepository, ILoggedWaterRepository loggedWaterRepository, IRecipeCommentRepository recipeCommentRepository, ILoggedCardioExerciseRepository loggedCardioExerciseRepository, ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository, IMessageRepository messageRepository, ILoggedMeasurementsRepository loggedMeasurementsRepository)
        {
            this.userManager = userManager;
            this.loggedFoodRepository = loggedFoodRepository;
            this.loggedWaterRepository = loggedWaterRepository;
            this.recipeCommentRepository = recipeCommentRepository;
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
            this.loggedStrengthExerciseRepository = loggedStrengthExerciseRepository;
            this.messageRepository = messageRepository;
            this.loggedMeasurementsRepository = loggedMeasurementsRepository;
        }
        public async Task<GetUserStatsQueryReponse> Handle(GetUserStatsQuery request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(request.UserId);
            if(!user.IsSuccess)
            {
                return new GetUserStatsQueryReponse
                {
                    Success = false,
                    Message = "User not found"
                };
            }

            var loggedFoods = await loggedFoodRepository.GetLoggedConsecutiveFoods(request.UserId);
            var loggedWater = await loggedWaterRepository.GetLoggedConsecutiveWater(request.UserId);
            var recipeComments = await recipeCommentRepository.GetCommentsCount(request.UserId);
            var loggedCardioCount = await loggedCardioExerciseRepository.GetLoggedCardioExercisesCount(request.UserId);
            var loggedStrengthCount = await loggedStrengthExerciseRepository.GetLoggedStrengthExercisesCount(request.UserId);
            var messagesWithDifferentUsers = await messageRepository.GetMessagesCountWithDifferentUsers(request.UserId);
            var consecutiveLoggedWeeks = await loggedMeasurementsRepository.GetLoggedConsecutiveWeeks(request.UserId);
            var userStats = new UserStatsDto
            {
                TotalConsecutiveLoggedFoodDays = loggedFoods,
                TotalLoggedWeightDays = consecutiveLoggedWeeks,
                TotalChats = messagesWithDifferentUsers,
                TotalConsecutiveLoggedWaterDays = loggedWater,
                TotalLoggedExercise = loggedCardioCount + loggedStrengthCount,
                TotalCommentsOnRecipes = recipeComments
            };
            return new GetUserStatsQueryReponse
            {
                Success = true,
                UserStats = userStats
            };

        }
    }
}
