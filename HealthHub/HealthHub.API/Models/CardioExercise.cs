using System.Text.Json.Serialization;

namespace HealthHub.API.Models
{
    public class CardioExercise
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("calories_per_hour")]
        public int CaloriesPerHour { get; set; }

    }

}
