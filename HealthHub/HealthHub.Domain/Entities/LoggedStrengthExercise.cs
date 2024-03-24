using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class LoggedStrengthExercise
    {
        private LoggedStrengthExercise(Guid userId, string name, string muscleGroup,int numberOfSets,string weightPerSet)
        {
            LoggedStrengthExerciseId = Guid.NewGuid();
            UserId = userId;
            Name = name;
            MuscleGroup = muscleGroup;
            NumberOfSets = numberOfSets;
            WeightPerSet = weightPerSet;
            DateLogged = DateTime.UtcNow;
        }
        public LoggedStrengthExercise()
        {
        }
        public Guid LoggedStrengthExerciseId { get; private set; }
        public Guid UserId { get; private set; }
        public string Name { get; private set; }
        public string MuscleGroup { get; private set; }
        public int NumberOfSets { get; private set; }
        public string WeightPerSet { get; private set; }
        public DateTime DateLogged { get; private set; }
        public static Result<LoggedStrengthExercise> Create(Guid userId, string name, string muscleGroup, int numberOfSets, string weightPerSet)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return Result<LoggedStrengthExercise>.Failure("Name cannot be empty");
            }
            if (string.IsNullOrWhiteSpace(muscleGroup))
            {
                return Result<LoggedStrengthExercise>.Failure("Muscle group cannot be empty");
            }
            if (numberOfSets < 0)
            {
                return Result<LoggedStrengthExercise>.Failure("Number of sets cannot be less than 0");
            }
            if (string.IsNullOrEmpty(weightPerSet))
            {
                return Result<LoggedStrengthExercise>.Failure("Weight per set cannot be empty");
            }
            return Result<LoggedStrengthExercise>.Success(new LoggedStrengthExercise(userId, name, muscleGroup, numberOfSets, weightPerSet));
        }
        public  Result<LoggedStrengthExercise> Update(string name,string muscleGroup,int numberOfSets, string weightPerSet)
        {
            if(string.IsNullOrEmpty(name))
            {
                return Result<LoggedStrengthExercise>.Failure("Name cannot be empty");
            }
            if(string.IsNullOrEmpty(muscleGroup))
            {
                return Result<LoggedStrengthExercise>.Failure("Muscle group cannot be empty");
            }
            if(numberOfSets < 0)
            {
                return Result<LoggedStrengthExercise>.Failure("Number of sets cannot be less than 0");
            }
            if (string.IsNullOrEmpty(weightPerSet))
            {
                return Result<LoggedStrengthExercise>.Failure("Weight per set cannot be empty");
            }
            Name = name;
            MuscleGroup = muscleGroup;
            NumberOfSets = numberOfSets;
            WeightPerSet = weightPerSet;
            return Result<LoggedStrengthExercise>.Success(this);
        }
    }
}
