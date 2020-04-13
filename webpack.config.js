const path = require("path");
const glob = require("glob");
const entryPlus = require("webpack-entry-plus");
const CleanPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

const devMode = true;

const entryFiles = [
  {
    entryFiles: glob.sync("./src/Web/Scripts/react/**/app.jsx"),
    outputName(item) {
      return item.replace("/app.jsx", "/app");
    },
  },
];

const entryPoints = Object.assign(
  { "./src/Web/Scripts/react/polyfill": ["babel-polyfill"] },
  entryPlus(entryFiles)
);

module.exports = {
  mode: devMode ? "developement" : "production",
  entry: entryPoints,
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname),
    filename: devMode ? "[name].dist.js" : "[name].[chunkhash:8].dist.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env", "react"],
        },
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
    extensions: [".js", ".jsx"],
    alias: {
      engage: path.resolve(__dirname, "./src/Web/Scripts/react/shared"),
    },
  },
  plugins: [
    new AssetsPlugin({
      fullPath: false,
      path: path.join(__dirname, "./src/Web/"),
    }),
    new CleanPlugin([
      "./src/Web/Scripts/react/**/*.dist.js",
      "./src/Web/Content/styles/**/*.dist.css",
    ]),
    new MiniCssExtractPlugin({
      filename: "src/Web/Content/styles/styles.dist.css",
    }),
  ],
};
