using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class FloatConverter : JsonConverter<float>
{
    public override float Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            var stringValue = reader.GetString();
            if (float.TryParse(stringValue, out var result))
            {
                return result;
            }
        }
        else if (reader.TokenType == JsonTokenType.Number)
        {
            return reader.GetSingle();
        }

        throw new JsonException($"Unable to convert \"{reader.GetString()}\" to System.Single.");
    }

    public override void Write(Utf8JsonWriter writer, float value, JsonSerializerOptions options)
    {
        writer.WriteNumberValue(value);
    }
}
