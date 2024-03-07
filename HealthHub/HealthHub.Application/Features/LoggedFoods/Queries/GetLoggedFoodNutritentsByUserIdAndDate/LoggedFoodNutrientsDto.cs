namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodNutritentsByUserIdAndDate
{
    public class LoggedFoodNutrientsDto
    {
        public int Calories { get; set; }
        public int Protein { get; set; }
        public int Carbohydrates { get; set; }
        public int Fat { get; set; }
    }
}