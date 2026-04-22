import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'www.macworld.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'f.nooncdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'eshop.vodafone.com.eg',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'eshop.vodafone.com.eg',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;