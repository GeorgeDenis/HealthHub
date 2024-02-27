namespace HealthHub.Application.Features.LoggedCardioExercises
{
    public class LoggedCardioExerciseDto
    {
        public Guid LoggedCardioExerciseId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int CaloriesBurned { get; set; }
        public DateTime DateLogged { get; set; }
    }
}