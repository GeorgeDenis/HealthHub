namespace HealthHub.Application.Features.Messages
{
    public class UserMessageProfileDto
    {
        public Guid UserId { get; set; } = Guid.Empty;
        public string Username { get; set; } = string.Empty;
        public string ProfilePictureUrl { get; set; } = string.Empty;
    }
}
