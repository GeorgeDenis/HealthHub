using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class LoggedCardioExercise 
    {
        private LoggedCardioExercise(Guid userId, string name, int duration, int caloriesBurned,DateTime dateTime)
        {
            LoggedCardioExerciseId = Guid.NewGuid();
            UserId = userId;
            Name = name;
            Duration = duration;
            CaloriesBurned = caloriesBurned;
            DateLogged = dateTime.ToUniversalTime();
        }
        public LoggedCardioExercise()
        {
        }
        public Guid LoggedCardioExerciseId { get; private set; }
        public Guid UserId { get; private set; }
        public string Name { get; private set; }
        public int Duration { get; private set; }
        public int CaloriesBurned { get; private set; }
        public DateTime DateLogged { get; private set; }
        public static Result<LoggedCardioExercise> Create(Guid userId, string name, int duration, int caloriesBurned,DateTime dateTime)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return Result<LoggedCardioExercise>.Failure("Name cannot be empty");
            }
            if (duration <= 0)
            {
                return Result<LoggedCardioExercise>.Failure("Duration must be greater than 0");
            }
            if (caloriesBurned < 0)
            {
                return Result<LoggedCardioExercise>.Failure("Calories burned cannot be less than 0");
            }
            if(dateTime == DateTime.MinValue)
            {
                return Result<LoggedCardioExercise>.Failure("Date cannot be empty");
            }
            return Result<LoggedCardioExercise>.Success(new LoggedCardioExercise(userId, name, duration, caloriesBurned,dateTime));
        }
        public Result<LoggedCardioExercise> Update(string name, int duration,int caloriesBurned)
        {
            if (string.IsNullOrEmpty(name))
            {
                return Result<LoggedCardioExercise>.Failure("Name cannot be empty");
            }
            if (duration <= 0)
            {
                return Result<LoggedCardioExercise>.Failure("Duration must be greater than 0");
            }
            if (caloriesBurned < 0)
            {
                return Result<LoggedCardioExercise>.Failure("Calories burned cannot be less than 0");
            }
            Name = name;
            Duration = duration;
            CaloriesBurned = caloriesBurned;
            return Result<LoggedCardioExercise>.Success(this);

        }
    }
}
