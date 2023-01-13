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
      // {
      //   test: /\.s[ac]ss$/,
      //   use: ["miniCssExtractPlugin.loader", "css-loader", "sass-loader"],
      // },
      { test: /\.scss$/, use: [ 
        { loader: "style-loader" },  // to inject the result into the DOM as a style block
        { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
        { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
        { loader: "sass-loader" },  // to convert SASS to CSS
        // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
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