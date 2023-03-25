/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    prependData: '@import "global-vars.scss";'
  }
}

module.exports = nextConfig
