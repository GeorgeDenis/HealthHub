using System.Text.Json.Serialization;

namespace HealthHub.API.Models
{
    public class NutrientDetail
    {
        [JsonPropertyName("quantity")]
        public float Quantity { get; set; }

        [JsonPropertyName("unit")]
        public string Unit { get; set; } = string.Empty;
    }

    public class TotalNutrients
    {
        [JsonPropertyName("FAT")]
        public NutrientDetail Fat { get; set; } = new NutrientDetail();

        [JsonPropertyName("CHOCDF")]
        public NutrientDetail Carbohydrates { get; set; } = new NutrientDetail();

        [JsonPropertyName("PROCNT")]
        public NutrientDetail Protein { get; set; } = new NutrientDetail();
    }
    public class NutritionalInfo
    {


        [JsonPropertyName("calories")]
        public float Calories { get; set; }

        [JsonPropertyName("totalNutrients")]
        public TotalNutrients TotalNutrients { get; set; } = new TotalNutrients();

    }

    public class FoodProductResponseByImage
    {
        [JsonPropertyName("foodName")]
        public List<string> FoodNames { get; set; } = new List<string>();
        [JsonPropertyName("nutritional_info")]
        public NutritionalInfo NutritionalInfo { get; set; } = new NutritionalInfo();
        [JsonPropertyName("serving_size")]
        public float ServingSize { get; set; }
    }

}
