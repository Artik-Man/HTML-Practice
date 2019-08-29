const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    app: "./ts/index.ts"
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "js"),
    publicPath: "/docs"
  },
  resolve: {
    extensions: [".ts", ".less", ".pug"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "less-loader",
          {
            loader: "less-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
      //   test: /\.pug$/,
      //   loaders: [
      //     {
      //       loader: "html-loader"
      //     },
      //     {
      //       loader: "pug-html-loader",
      //       options: {
      //         pretty: true,
      //         filters: {
      //           escape: code => {
      //             return code.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
      //           }
      //         }
      //       }
      //     }
      //   ]
      }
    ]
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.pug"
    })
  ]
};
