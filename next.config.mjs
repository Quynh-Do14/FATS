/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['giphy.com', 'media.giphy.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fats.vn',
        pathname: '/api/v1/files/preview/**'
      },
      {
        protocol: 'https',
        hostname: 'fats.vn',
        pathname: '/api/v1/hdkt/files/preview/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/v1/files/preview/**'
      }
    ]
  },
  reactStrictMode: true, // Khuyến nghị bật chế độ strict mode
  swcMinify: true // Bật SWC để tối ưu hóa build
}

export default nextConfig
