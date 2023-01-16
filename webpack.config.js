const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: ["@babel/polyfill", "./index.tsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].[contenthash].js",
  },
  devServer: {
    port: 4020,
    historyApiFallback: true,
  },
  resolve: { extensions: [".ts", ".tsx", ".js", "jsx"] },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(css)$/,
        use: ["miniCssExtractPlugin.loader", "css-loader"],
      },
      { test: /\.scss$/, use: [ 
        { loader: "style-loader" }, 
        { loader: "css-modules-typescript-loader"}, 
        { loader: "css-loader", options: { modules: true } },  
        { loader: "sass-loader" }, 

    ] },
      {
        test: /\.(jpe?g|png|gif|mp3)$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src", "index.html"),
    }),
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    })
  ],
};