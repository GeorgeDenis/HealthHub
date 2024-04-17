namespace HealthHub.Application.Features.EmailMessages
{
    public class LoggedCardioExerciseExportDto
    {
        public string Name { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int CaloriesBurned { get; set; }
        public DateTime DateLogged { get; set; }
    }
}
