const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const candidates = require("./candidates.json");

module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: "public/index.html" }])
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "./public"),
    hot: true,
    open: true,
    historyApiFallback: true,
    before: function(app) {
      app.get("/candidates", function(req, res) {
        res.json(candidates);
      });
    }
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
};
