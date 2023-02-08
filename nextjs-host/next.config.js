const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        // name: "host",
        filename: "remoteEntry.js",
        remotes: {},
      })
    );
    return config;
  },
};

module.exports = nextConfig;
