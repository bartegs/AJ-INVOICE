const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, "dist/"),
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 9000,
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
});
