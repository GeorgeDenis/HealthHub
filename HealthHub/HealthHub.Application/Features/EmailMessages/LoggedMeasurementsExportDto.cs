namespace HealthHub.Application.Features.EmailMessages
{
    public class LoggedMeasurementsExportDto
    {
        public DateTime DateLogged { get; set; }
        public float? Weight { get; set; }
        public float? WaistCircumference { get; set; }
        public float? HipCircumference { get; set; }
        public float? NeckCircumference { get; set; }
        public string? WeightPhotoUrl { get; set; }
    }
}
