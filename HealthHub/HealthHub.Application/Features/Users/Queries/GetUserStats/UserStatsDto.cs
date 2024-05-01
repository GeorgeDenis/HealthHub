namespace HealthHub.Application.Features.Users.Queries.GetUserStats
{
    public class UserStatsDto
    {
        public int TotalConsecutiveLoggedFoodDays { get; set; }
        public int TotalLoggedWeightDays { get; set; }
        public int TotalChats { get; set; }

        public int TotalConsecutiveLoggedWaterDays { get; set; }
        public int TotalLoggedExercise { get; set; }
        public int TotalCommentsOnRecipes { get; set; }

    }
}