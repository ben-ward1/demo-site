using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.IO;

namespace Infrastructure.Helpers
{
    public static class SerializationHelper
    {
        public static void Serialize(object value, TextWriter writer)
        {
            var serializer = JsonSerializer.Create(SerializationSettings);
            serializer.Serialize(writer, value);
        }

        public static JsonSerializerSettings SerializationSettings
        {
            get
            {
                var settings = new JsonSerializerSettings
                {
                    ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(),
                };
                settings.Converters.Add(new IsoDateTimeConverter());

                return settings;
            }
        }

        public static string ToIdiomaticJson(this object value)
        {
            var serializer = JsonSerializer.Create(SerializationSettings);

            using (var writer = new StringWriter())
            {
                serializer.Serialize(writer, value);
                return writer.ToString();
            }
        }
    }
}
