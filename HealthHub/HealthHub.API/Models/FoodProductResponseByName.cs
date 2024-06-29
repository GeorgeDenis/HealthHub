using System.Text.Json.Serialization;

public class FoodProductResponseByName
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("calories")]
    [JsonConverter(typeof(FloatConverter))]
    public float Calories { get; set; }

    [JsonPropertyName("serving_size_g")]
    [JsonConverter(typeof(FloatConverter))]
    public float ServingSizeInGrams { get; set; }

    [JsonPropertyName("protein_g")]
    [JsonConverter(typeof(FloatConverter))]
    public float Protein { get; set; }

    [JsonPropertyName("carbohydrates_total_g")]
    [JsonConverter(typeof(FloatConverter))]
    public float Carbohydrates { get; set; }

    [JsonPropertyName("fat_total_g")]
    [JsonConverter(typeof(FloatConverter))]
    public float Fat { get; set; }
}
