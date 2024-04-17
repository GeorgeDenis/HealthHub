namespace HealthHub.Application.Features.EmailMessages
{
    public class LoggedStrengthExerciseExportDto
    {
        public string Name { get; set; } = string.Empty;
        public string MuscleGroup { get; set; } = string.Empty;
        public int NumberOfSets { get; set; }
        public string WeightPerSet { get; set; } = string.Empty;
        public DateTime DateLogged { get; set; }
    }
}
