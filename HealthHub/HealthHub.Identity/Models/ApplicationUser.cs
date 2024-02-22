using HealthHub.Identity.Models.Enums;
using Microsoft.AspNetCore.Identity;

namespace HealthHub.Identity.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }
        public int? Age { get; set; }
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
        public  ActivityLevel? Activity { get; set; }
    }
}
