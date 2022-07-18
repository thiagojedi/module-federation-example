const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require('./package.json');

// Constant with our paths
const paths = {
  ROOT: path.resolve(__dirname),
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
};

const developmentMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.join(paths.SRC, 'index.js'),
  output: {
    publicPath: 'http://localhost:3001/',
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
  devServer: {
    open: true,
    port: 3001,
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: developmentMode && 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        './Counter': './src/components/counter/Counter',
      },
      shared: dependencies,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: process.env.NODE_ENV || 'production',
};
