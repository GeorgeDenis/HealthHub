using System.Text.Json.Serialization;

namespace HealthHub.API.Models
{
    public class FoodProductResponseByName
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
        
        [JsonPropertyName("calories")]
        public float Calories { get; set; }

        [JsonPropertyName("serving_size_g")]
         public float ServingSizeInGrams { get; set; }
        
        [JsonPropertyName("protein_g")]
        public float Protein { get; set; }
        
        [JsonPropertyName("carbohydrates_total_g")]
        public float Carbohydrates { get; set; }
        
        [JsonPropertyName("fat_total_g")]
        public float Fat { get; set; }
    }
}
