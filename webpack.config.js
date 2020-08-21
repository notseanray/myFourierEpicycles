var path = require("path");
// const CompressionPlugin = require("compression-webpack-plugin");
// var BrotliPlugin = require("brotli-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  stats: {
    colors: true,
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 10000,
    ignored: ["node_modules/**"],
  },
  mode: "development",
  devtool: "",
  optimization: {
    splitChunks: {
      chunks: "all",
      filename: "vendors.main.bundle.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {
            limit: 40 * 1024,
            name: "[name].[ext]",
            outputPath: "images/",
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      DropzoneMin: path.resolve(__dirname, "node_modules/dropzone/dist/min/"),
    },
  },
};
