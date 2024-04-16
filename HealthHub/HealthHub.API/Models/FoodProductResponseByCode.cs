using System.Text.Json.Serialization;

namespace HealthHub.API.Models
{

    public class Nutriments
    {
        [JsonPropertyName("carbohydrates_100g")]
        public float Carbohydrates { get; set; }

        [JsonPropertyName("proteins_100g")]
        public float Proteins { get; set; }

        [JsonPropertyName("fat_100g")]
        public float Fat { get; set; }

        [JsonPropertyName("energy-kcal_100g")]
        public float Calories { get; set; }

        [JsonPropertyName("sodium")]
        public float Sodium { get; set; }
        public float ServingSizeInGrams { get; set; } = 100;

    }

    public class FoodProductResponseApiCode
    {
        [JsonPropertyName("product_name")]
        public string ProductName { get; set; } = string.Empty;

        [JsonPropertyName("nutriments")]
        public Nutriments NutrimentsData { get; set; } = new Nutriments();
    }
    public class FoodProductResponseByCode
    {
        [JsonPropertyName("product")]
        public FoodProductResponseApiCode Product { get; set; }
    }

}
