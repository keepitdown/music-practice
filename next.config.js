/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/music-practice',
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]]
  }
}

module.exports = nextConfig
