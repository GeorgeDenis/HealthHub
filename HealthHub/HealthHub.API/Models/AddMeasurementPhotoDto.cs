namespace HealthHub.API.Models
{
    public class AddMeasurementPhotoDto
    {
        public IFormFile File { get; set; }
        public Guid LoggedMeasurementsId { get; set; }
        public Guid UserId { get; set; }

    }
}
