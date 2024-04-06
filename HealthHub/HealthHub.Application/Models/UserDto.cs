using HealthHub.Application.Features;
using HealthHub.Application.Features.Users;

namespace HealthHub.Application.Models
{
    public class UserDto
    {
        public string? UserId { get; set; }
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public List<string>? Roles { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? Height { get; set; }
        public Gender? Gender { get; set; }
        public string? Bio { get; set; }
        public string? Mobile { get; set; }
        public string? Location { get; set; }
        public float? StartingWeight { get; set; }
        public float? CurrentWeight { get; set; }
        public float? GoalWeight { get; set; }
        public float? WeeklyGoal { get; set; }
        public GoalType? GoalType { get; set; }
        public ActivityLevel? Activity { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }
}
