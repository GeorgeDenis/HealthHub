namespace HealthHub.Application.Features.Users
{
    public class GoalsDto
    {
        public float? StartingWeight { get; set; }
        public float? CurrentWeight { get; set; }
        public float? GoalWeight { get; set; }
        public float? WeeklyGoal { get; set; }
        public ActivityLevel? Activity { get; set; }
    }
}
