var path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    // Write all output files to dist folder. Use path to get pwd.
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
    // publicPath: "/assets/",
  },
  stats: {
    colors: true,
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 10000,
    ignored: [
      "src/js/imagetracer_v1.2.6.js",
      "node_modules/**",
      "src/js/computedPaths/**",
    ],
  },

  // Can put to production for better perfomance. i.e. may minimse some code.
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "babel-loader",
      // },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        test: /\.(png|svg|jpg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images/",
        },
      },
    ],
  },
};
