/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    prependData: '@import "global-vars.scss";'
  }
}

module.exports = nextConfig
