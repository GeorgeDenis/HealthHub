using HealthHub.Application.Features;
using HealthHub.Application.Features.Users;
using System.ComponentModel.DataAnnotations;

namespace HealthHub.Application.Models.Identity
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        public float? CurrentWeight { get; set; }
        public int? Height { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Location { get; set; }
        public Gender? Gender { get; set; }
        public GoalType? GoalType { get; set; }
        public float? WeeklyGoal { get; set; }
        public ActivityLevel? Activity { get; set; }
    }
}
