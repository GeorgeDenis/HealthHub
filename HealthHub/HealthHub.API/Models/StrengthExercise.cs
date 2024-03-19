using System.Text.Json.Serialization;

namespace HealthHub.API.Models
{
    public class StrengthExercise
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("muscle")]
        public string Muscle { get; set; }

        [JsonPropertyName("difficulty")]
        public string Difficulty { get; set; }

        [JsonPropertyName("instructions")]
        public string Instructions { get; set; }

    }
}
