namespace HealthHub.Application.Features.LoggedStrengthExercises
{
    public class LoggedStrengthExerciseDto
    {
        public Guid LoggedStrengthExerciseId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string MuscleGroup { get; set; } = string.Empty;
        public int NumberOfSets { get; set; }
        public string WeightPerSet { get; set; } = string.Empty;
        public DateTime DateLogged { get; set; }
    }
}