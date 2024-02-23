namespace HealthHub.Application.Features.LoggedStrengthExercises
{
    public class LoggedStrengthExercisesDto
    {
        public Guid LoggedStrengthExerciseId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string MuscleGroup { get; set; }
        public int NumberOfSets { get; set; }
        public int WeightPerSet { get; set; }
        public DateTime DateLogged { get; set; }
    }
}