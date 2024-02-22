namespace HealthHub.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserDto
    {
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Bio { get; set; }
        public string? Mobile { get; set; }
        public string? Location { get; set; }
        public int? Age { get; set; }
        public int? Height { get; set; }
        public Gender? Gender { get; set; }
        public float? StartingWeight { get; set; }
        public float? CurrentWeight { get; set; }
        public float? GoalWeight { get; set; }
        public float? WeeklyGoal { get; set; }
        public GoalType? GoalType { get; set; }
        public ActivityLevel? Activity { get; set; }

    }
}
