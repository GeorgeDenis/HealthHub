namespace HealthHub.API.Models
{
    public class AddProfilePhotoDto
    {
        public IFormFile File { get; set; } 
        public Guid UserId { get; set; }
    }
}
