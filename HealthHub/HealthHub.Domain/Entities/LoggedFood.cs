using HealthHub.Domain.Common;
using HealthHub.Domain.Entities.Enums;

namespace HealthHub.Domain.Entities
{
    public class LoggedFood
    {
        private LoggedFood(Guid userId, float? servingSize, float? numberOfServings, MealType mealType, string name, int calories, int protein, int carbohydrates, int fat)
        {
            LoggedFoodId = Guid.NewGuid();
            UserId = userId;
            ServingSize = servingSize;
            NumberOfServings = numberOfServings;
            MealType = mealType;
            Name = name;
            Calories = calories;
            Protein = protein;
            Carbohydrates = carbohydrates;
            Fat = fat;
            DateLogged = DateTime.UtcNow;
        }
        public LoggedFood()
        {
        }
        public Guid LoggedFoodId { get; private set; }
        public Guid UserId { get; private set; }
        public float? ServingSize { get; private set; }
        public float? NumberOfServings { get; private set; }
        public MealType MealType { get; private set; }
        public string Name { get; private set; }
        public int Calories { get; private set; }
        public int Protein { get; private set; }
        public int Carbohydrates { get; private set; }
        public int Fat { get; private set; }
        public DateTime DateLogged { get; private set; }
        public static Result<LoggedFood> Create(Guid userId, float? servingSize, float? numberOfServings, MealType mealType, string name, int calories, int protein, int carbohydrates, int fat)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return Result<LoggedFood>.Failure("Name cannot be empty");
            }
            if (servingSize <= 0)
            {
                return Result<LoggedFood>.Failure("Serving size must be greater than 0");
            }
            if (numberOfServings <= 0)
            {
                return Result<LoggedFood>.Failure("Number of servings must be greater than 0");
            }
            if (calories < 0)
            {
                return Result<LoggedFood>.Failure("Calories cannot be less than 0");
            }
            if (protein < 0)
            {
                return Result<LoggedFood>.Failure("Protein cannot be less than 0");
            }
            if (carbohydrates < 0)
            {
                return Result<LoggedFood>.Failure("Carbohydrates cannot be less than 0");
            }
            if (fat < 0)
            {
                return Result<LoggedFood>.Failure("Fat cannot be less than 0");
            }
            //if (protein * 4 + carbohydrates * 4 + fat * 9 != calories - 50)
            //{
            //    return Result<LoggedFood>.Failure("Calories must be equal to 4 * protein + 4 * carbohydrates + 9 * fat");
            //}
            return Result<LoggedFood>.Success(new LoggedFood(userId, servingSize, numberOfServings, mealType, name, calories, protein, carbohydrates, fat));
        }
        public Result<LoggedFood> Update(float? servingSize, float? numberOfServings, MealType mealType, string name, int calories, int protein, int carbohydrates, int fat)
        {
            if (servingSize <= 0)
            {
                return Result<LoggedFood>.Failure("Serving size must be greater than 0");
            }
            if (numberOfServings <= 0)
            {
                return Result<LoggedFood>.Failure("Number of servings must be greater than 0");
            }
            if (calories < 0)
            {
                return Result<LoggedFood>.Failure("Calories cannot be less than 0");
            }
            if (protein < 0)
            {
                return Result<LoggedFood>.Failure("Protein cannot be less than 0");
            }
            if (carbohydrates < 0)
            {
                return Result<LoggedFood>.Failure("Carbohydrates cannot be less than 0");
            }
            if (fat < 0)
            {
                return Result<LoggedFood>.Failure("Fat cannot be less than 0");
            }
            if (protein * 4 + carbohydrates * 4 + fat * 9 != calories - 50)
            {
                return Result<LoggedFood>.Failure("Calories must be equal to 4 * protein + 4 * carbohydrates + 9 * fat");
            }
            ServingSize = servingSize;
            NumberOfServings = numberOfServings;
            MealType = mealType;
            Name = name;
            Calories = calories;
            Protein = protein;
            Carbohydrates = carbohydrates;
            Fat = fat;
            return Result<LoggedFood>.Success(this);
        }

    }
}
