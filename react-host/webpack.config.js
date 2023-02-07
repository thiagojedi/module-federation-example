const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

// Constant with our paths
const paths = {
  ROOT: path.resolve(__dirname),
  DIST: path.resolve(__dirname, 'public'),
  SRC: path.resolve(__dirname, 'src'),
};

const developmentMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.join(paths.SRC, 'index.js'),
  output: {
    path: paths.DIST,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devtool: developmentMode && 'source-map',
  devServer: {
    open: true,
    port: 3000,
    hot: false,
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: process.env.NODE_ENV || 'production',
};
