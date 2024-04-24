namespace HealthHub.Application.Features.Users.Queries.GetUserSearchFiltered
{
    public class UserSearchDto
    {
        public string? UserId { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }
}