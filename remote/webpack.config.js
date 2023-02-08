const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

// Constant with our paths
const paths = {
  ROOT: path.resolve(__dirname),
  DIST: path.resolve(__dirname, "public"),
  SRC: path.resolve(__dirname, "src"),
};

const developmentMode = process.env.NODE_ENV === "development";
const exposeAsMF = true;

module.exports = {
  entry: path.join(paths.SRC, "index.js"),
  output: {
    path: paths.DIST,
    filename: "remote.js",
    publicPath: "http://localhost:3001/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    port: 3001,
    hot: false,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: developmentMode && "source-map",
  mode: process.env.NODE_ENV || "development",
};

if (exposeAsMF) {
  const MFPlugin = new ModuleFederationPlugin({
    name: "remote",
    filename: "remoteEntry.js",
    exposes: {
      "./Counter": "./src/Counter.js",
      "./Loading": "./src/Loading.js",
    },
    shared: {
      react: {
        singleton: true,
        version: "0",
        requiredVersion: false,
      },
      "react-dom": {
        singleton: true,
        version: "0",
        requiredVersion: false,
      },
    },
  });
  module.exports.plugins.push(MFPlugin);
}
