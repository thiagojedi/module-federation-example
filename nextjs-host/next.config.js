/** @type {import('next').NextConfig} */

const NextFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          remote: 'remote@https://module-federation-example-rho.vercel.app/remoteEntry.js'
        },
        shared: {
          react: '18.2.0',
          'react-dom': '18.2.0'
        }
      })
    )
    return config
  }
}

module.exports = nextConfig
