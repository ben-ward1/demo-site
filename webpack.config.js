const path = require("path");
const glob = require("glob");
const entryPlus = require("webpack-entry-plus");
const CleanPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = false;

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
  mode: devMode ? "developement" : "production",
  entry: entryPoints,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname),
    //filename: devMode ? "[name].dist.js" : "[name].[chunkhash:8].dist.js",
    filename: "[name].dist.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        // options: {
        //   presets: ["env", "react"],
        // },
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
    new CleanPlugin([
      "./src/Web/Scripts/react/**/*.dist.js",
      "./src/Web/Content/styles/**/*.dist.css",
    ]),
    new MiniCssExtractPlugin({
      filename: "src/Web/Content/styles/styles.dist.css",
    }),
  ],
};
