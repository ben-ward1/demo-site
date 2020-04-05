"use strict";

var path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  entry: "./WardDemo/Scripts/Home/react/index.js",
  output: {
    path: path.resolve(__dirname, "./WardDemo/Scripts/dist/Home/react"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [new WebpackNotifierPlugin(), new BrowserSyncPlugin()],
};
