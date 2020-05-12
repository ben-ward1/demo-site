const path = require("path");
const glob = require("glob");
const entryPlus = require("webpack-entry-plus");
const CleanPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const entryFiles = [
  {
    entryFiles: glob.sync("./src/Web/Scripts/react/**/app.tsx"),
    outputName(item) {
      return item.replace("/app.tsx", "/app");
    },
  },
];

const entryPoints = Object.assign(
  { "./src/Web/Scripts/react/polyfill": ["babel-polyfill"] },
  entryPlus(entryFiles)
);

module.exports = {
  mode: devMode ? "development" : "production",
  entry: entryPoints,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname),
    filename: devMode ? "[name].dist.js" : "[name].[chunkhash:8].dist.js",
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
          name: "./src/Web/Scripts/react/common",
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
      path: path.join(__dirname, "./src/Web/"),
    }),
    new CleanPlugin([
      "./src/Web/Scripts/react/**/*.dist.js",
      "./src/Web/Scripts/react/**/*.dist.js.map",
      "./src/Web/Content/styles/**/*.dist.css",
      "./src/Web/Content/styles/**/*.dist.css.map",
    ]),
    new MiniCssExtractPlugin({
      filename: devMode
        ? "./src/Web/Content/styles/styles.dist.css"
        : "./src/Web/Content/styles/styles.[chunkhash:8].dist.css",
    }),
  ],
};
