namespace HealthHub.API.Models
{
    public class FoodProductGeneralResponse
    {
        public string Name { get; set; } = string.Empty;
        public float Calories { get; set; }
        public float ServingSizeInGrams { get; set; }
        public float Protein { get; set; }
        public float Carbohydrates { get; set; }
        public float Fat { get; set; }
    }
}
