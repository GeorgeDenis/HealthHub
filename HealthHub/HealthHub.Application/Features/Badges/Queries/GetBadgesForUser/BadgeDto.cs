namespace HealthHub.Application.Features.Badges.Queries.GetBadgesForUser
{
    public class BadgeDto
    {
        public string Name { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Active { get; set; } = false;
    }
}
