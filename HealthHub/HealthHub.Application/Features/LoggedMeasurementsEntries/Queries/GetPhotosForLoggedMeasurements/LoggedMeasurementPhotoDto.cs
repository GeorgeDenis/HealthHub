namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetPhotosForLoggedMeasurements
{
    public class LoggedMeasurementPhotoDto
    {
        public Guid LoggedMeasurementId { get; set; }
        public string CloudUrl { get; set; } = string.Empty;
        public DateTime DateLogged { get; set; }
    }
}