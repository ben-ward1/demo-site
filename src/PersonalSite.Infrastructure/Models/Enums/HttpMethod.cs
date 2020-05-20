using System.ComponentModel;

namespace Infrastructure.Models.Enums
{
    public enum HttpMethod
    {
        [Description("GET")]
        Get,

        [Description("PUT")]
        Put,

        [Description("POST")]
        Post,

        [Description("DELETE")]
        Delete
    }
}
