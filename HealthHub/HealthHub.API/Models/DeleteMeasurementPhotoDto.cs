namespace HealthHub.API.Models
{
    public class DeleteMeasurementPhotoDto
    {
        public Guid LoggedMeasurementsId { get; set; }
        public Guid UserId { get; set; }
    }
}
