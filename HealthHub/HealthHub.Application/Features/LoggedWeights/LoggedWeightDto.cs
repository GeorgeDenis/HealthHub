namespace HealthHub.Application.Features.LoggedWeights
{
    public class LoggedWeightDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public float Weight { get; set; }
        public DateTime DateLogged { get; set; }
    }
}