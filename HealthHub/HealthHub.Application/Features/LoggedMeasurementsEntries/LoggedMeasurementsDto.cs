namespace HealthHub.Application.Features.LoggedMeasurementsEntries
{
    public class LoggedMeasurementsDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateLogged { get; set; }
        public float? Weight { get; set; }
        public float? WaistCircumference { get; set; }
        public float? HipCircumference { get; set; }
        public float? NeckCircumference { get; set; }
        public string? WeightPhotoUrl { get; set; }
    }
}
