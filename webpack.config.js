const path = require("path");
const glob = require("glob");
const entryPlus = require("webpack-entry-plus");
const CleanPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

const entryFiles = [
  {
    entryFiles: glob.sync("./src/PersonalSite.Web/Scripts/react/**/app.tsx"),
    outputName(item) {
      return item.replace("/app.tsx", "/app");
    },
  },
];

const entryPoints = Object.assign(
  { polyfill: ["babel-polyfill"] },
  entryPlus(entryFiles)
);

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";

  return {
    mode: devMode ? "development" : "production",
    entry: entryPoints,
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname),
      filename: "./src/PersonalSite.Web/wwwroot/[chunkhash:8].dist.js",
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
        },
        {
          test: /\.s[c|a]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "source-map-loader",
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "common",
            enforce: true,
            chunks: "all",
          },
        },
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
      new AssetsPlugin({
        fullPath: false,
        path: path.join(__dirname, "./src/PersonalSite.Web/"),
      }),
      new CleanPlugin([
        "./src/PersonalSite.Web/wwwroot/*.dist.js",
        "./src/PersonalSite.Web/wwwroot/*.dist.js.map",
        "./src/PersonalSite.Web/wwwroot/Content/styles/**/*.dist.css",
        "./src/PersonalSite.Web/wwwroot/Content/styles/**/*.dist.css.map",
      ]),
      new MiniCssExtractPlugin({
        filename: devMode
          ? "./src/PersonalSite.Web/wwwroot/Content/styles/styles.dist.css"
          : "./src/PersonalSite.Web/wwwroot/Content/styles/styles.[chunkhash:8].dist.css",
      }),
    ],
  };
};
