const path = require('path');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require('./package.json');

// Constant with our paths
const paths = {
  ROOT: path.resolve(__dirname),
  DIST: path.resolve(__dirname, 'public'),
  SRC: path.resolve(__dirname, 'src'),
};

const developmentMode = process.env.NODE_ENV === 'development';
const exposeAsMF = !!process.env.MF;

module.exports = {
  entry: path.join(paths.SRC, 'index.js'),
  output: {
    path: paths.DIST,
    filename: 'remote.js',
    publicPath: 'https://module-federation-example-rho.vercel.app/',
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
    port: 3001,
    hot: false,
    historyApiFallback: true,
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: developmentMode && 'source-map',
  mode: process.env.NODE_ENV || 'production',
};

if (exposeAsMF) {
  const MFPlugin = new ModuleFederationPlugin({
    name: "remote",
    filename: "remoteEntry.js",
    exposes: {
      './Counter': './src/index.js',
    },
    shared: dependencies,
  });
  module.exports.plugins.push(MFPlugin);
}
