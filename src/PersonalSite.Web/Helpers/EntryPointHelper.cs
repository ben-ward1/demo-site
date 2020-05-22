using Microsoft.AspNetCore.Html;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;

namespace Web.Helpers
{
    public static class EntryPointHelper
    {
        private static Dictionary<string, AssetPair> _assets;

        static EntryPointHelper()
        {
            _assets = GetWebpackAssetsJson();
        }

        public static HtmlString ReactEntryPoint(string entryPoint)
        {
            var output = new List<string>();
            output.Add(ScriptWithCachebustingHash("~/polyfill"));
            output.Add(ScriptWithCachebustingHash("~/common"));
            output.Add(ScriptWithCachebustingHash(entryPoint));
            return new HtmlString(string.Join("\n", output));
        }

        public static HtmlString StyleEntryPoint(string path)
        {
            path = path.Replace(".tsx", "").ToLower();

            if (!_assets.ContainsKey(path))
            {
                throw new InvalidOperationException(string.Format("Couldn't find {0}", path));
            }
            var cachebustedPath = _assets[path].Css;
            var absolutePath = PathFor(cachebustedPath);
            var output = string.Format(@"<link href=""{0}"" rel=""stylesheet""/>", absolutePath.Replace("wwwroot/", ""));

            return new HtmlString(output);
        }

        private static string ScriptWithCachebustingHash(string path)
        {
            path = path.Replace(".tsx", "").ToLower();

            if (!_assets.ContainsKey(path))
            {
                throw new InvalidOperationException(string.Format("Couldn't find {0}", path));
            }
            var cachebustedPath = _assets[path].Js;
            var absolutePath = PathFor(cachebustedPath);

            return string.Format(@"<script src=""{0}""></script>", absolutePath.Replace("wwwroot/", ""));
        }

        private static Dictionary<string, AssetPair> GetWebpackAssetsJson()
        {
            JObject o1 = JObject.Parse(File.ReadAllText(string.Format("{0}\\webpack-assets.json", AppDomain.CurrentDomain.BaseDirectory)));
            var assets = new Dictionary<string, AssetPair>();
            foreach (var x in o1)
            {
                var key = x.Key;
                var jsValue = x.Value["js"].Value<string>();
                var cssValue = x.Value["css"] != null ? x.Value["css"].Value<string>() : "";
                var keyFixed = ToRelative(key);
                var jsValueFixed = ToRelative(jsValue);
                var cssValueFixed = cssValue != null && cssValue.Length > 0 ? ToRelative(cssValue) : "";
                var value = new AssetPair
                {
                    Js = jsValueFixed,
                    Css = cssValueFixed
                };

                assets.Add(keyFixed, value);
            }

            return assets;
        }

        private static string ToRelative(string path)
        {
            return path.Replace("./src/PersonalSite.Web/wwwroot/", "~/").ToLower();
        }

        private static string PathFor(string filePath)
        {
            return filePath.Replace("~", "");
        }

        private class AssetPair
        {
            public string Js { get; set; }
            public string Css { get; set; }
        }
    }
}