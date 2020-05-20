using Microsoft.AspNetCore.Html;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;

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
            // TODO : Think I rememberd that the absolute path was already being passed in. Check this.
            //return VirtualPathUtility.ToAbsolute(filePath);

            return filePath.Replace("~", "");
        }

        public static HtmlString ReactEntryPoint(string entryPoint)
        {
            var output = new List<string>();
            output.Add(ScriptWithCachebustingHash("polyfill"));
            output.Add(ScriptWithCachebustingHash("common"));
            output.Add(ScriptWithCachebustingHash(entryPoint));
            return new HtmlString(string.Join("\n", output));
        }

        public static HtmlString StyleEntryPoint(string path)
        {
            var fixedPath = path.Replace(".tsx", "").ToLower();
            fixedPath = fixedPath.Replace("~/", "./src/personalSite.web/").ToLower();

            if (!_assets.ContainsKey(fixedPath))
            {
                throw new InvalidOperationException(string.Format("Couldn't find {0}", fixedPath));
            }
            var cachebustedPath = _assets[fixedPath].Css;
            var absolutePath = PathFor(cachebustedPath);
            var output = string.Format(@"<link href=""{0}"" rel=""stylesheet""/>", absolutePath.Replace("wwwroot/", ""));

            return new HtmlString(output);
        }

        public static string ScriptWithCachebustingHash(string path)
        {
            var fixedPath = path.Replace(".tsx", "");
            fixedPath = fixedPath.Replace("~/", "./src/personalSite.web/").ToLower();

            if (!_assets.ContainsKey(fixedPath))
            {
                throw new InvalidOperationException(string.Format("Couldn't find {0}", fixedPath));
            }
            var cachebustedPath = _assets[fixedPath].Js;
            var absolutePath = PathFor(cachebustedPath);

            return string.Format(@"<script src=""{0}""></script>", absolutePath.Replace("wwwroot/", ""));
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
                var jsValueFixed = ToRelative(jsValue);
                var cssValue = x.Value["css"] != null ? x.Value["css"].Value<string>() : "";
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

        private static string ToFixed(string path)
        {
            return path.Replace("./src/Web/", "~/").ToLower();
        }

        private static string ToRelative(string path)
        {
            return "~/" + path.Replace("./src/PersonalSite.Web/wwwroot/", "");
        }
    }

    internal class AssetPair
    {
        public string Js { get; set; }
        public string Css { get; set; }
    }
}