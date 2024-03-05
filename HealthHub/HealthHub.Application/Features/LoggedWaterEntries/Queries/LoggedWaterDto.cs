namespace HealthHub.Application.Features.LoggedWaterEntries.Queries
{
    public class LoggedWaterDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateLogged { get; set; }
        public float Amount { get; set; }
    }
}