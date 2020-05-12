using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;

namespace Web.Helpers
{
    public static class EntryPointHelper
    {
        static Dictionary<string, AssetPair> _assets;

        static EntryPointHelper()
        {
            _assets = GetWebpackAssetsJson();
        }

        public static string PathFor(string filePath)
        {
            return VirtualPathUtility.ToAbsolute(filePath);
        }

        public static IHtmlString ReactEntryPoint(string entryPoint)
        {
            var output = new List<string>();
            output.Add(ScriptWithCachebustingHash("~/Scripts/react/polyfill"));
            output.Add(ScriptWithCachebustingHash("~/Scripts/react/common"));
            output.Add(ScriptWithCachebustingHash(entryPoint));
            return new HtmlString(string.Join("\n", output));
        }

        public static IHtmlString StyleEntryPoint(string path)
        {
            var fixedPath = path.Replace(".tsx", "").ToLower();

            if (!_assets.ContainsKey(fixedPath))
            {
                throw new InvalidOperationException(string.Format("Couldn't find {0}", fixedPath));
            }
            var cachebustedPath = _assets[fixedPath].Css;
            var absolutePath = PathFor(cachebustedPath);
            var output = string.Format(@"<link href=""{0}"" rel=""stylesheet""/>", absolutePath);

            return new HtmlString(output);
        }

        public static string ScriptWithCachebustingHash(string path)
        {
            var fixedPath = path.Replace(".tsx", "").ToLower();

            if (!_assets.ContainsKey(fixedPath))
            {
                throw new InvalidOperationException(string.Format("Couldn't find {0}", fixedPath));
            }
            var cachebustedPath = _assets[fixedPath].Js;
            var absolutePath = PathFor(cachebustedPath);

            return string.Format(@"<script src=""{0}""></script>", absolutePath);
        }

        internal static Dictionary<string, AssetPair> GetWebpackAssetsJson()
        {
            JObject o1 = JObject.Parse(File.ReadAllText(string.Format("{0}\\webpack-assets.json", AppDomain.CurrentDomain.BaseDirectory)));
            var assets = new Dictionary<string, AssetPair>();
            foreach (var x in o1)
            {
                var key = x.Key;
                var keyFixed = ToFixed(key);
                var jsValue = x.Value["js"].Value<string>();
                var jsValueFixed = ToFixed(jsValue);
                var cssValue = x.Value["css"] != null ? x.Value["css"].Value<string>() : "";
                var cssValueFixed = cssValue != null && cssValue.Length > 0 ? ToFixed(cssValue) : "";
                var value = new AssetPair
                {
                    Js = jsValueFixed,
                    Css = cssValueFixed
                };

                assets.Add(keyFixed, value);
            }

            return assets;
        }

        private static string ToFixed(string path)
        {
            return path.Replace("./src/Web/", "~/").ToLower();
        }
    }

    internal class AssetPair
    {
        public string Js { get; set; }
        public string Css { get; set; }
    }
}