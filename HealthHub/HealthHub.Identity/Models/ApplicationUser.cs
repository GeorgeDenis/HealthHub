using Microsoft.AspNetCore.Identity;

namespace HealthHub.Identity.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }
    }
}
