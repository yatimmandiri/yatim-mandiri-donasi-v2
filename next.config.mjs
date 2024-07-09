/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'next.yatimmandiri.org',
      },
      {
        protocol: 'https',
        hostname: 'yatimmandiri.org',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://api.yatimmandiri.org/api/:path*',
      },
      {
        source: '/csrf-cookie',
        destination: 'https://api.yatimmandiri.org/sanctum/csrf-cookie',
      },
      {
        source: '/storage/:path*',
        destination: 'https://api.yatimmandiri.org/storage/:path*',
      },
      {
        source: '/api/news/:path*',
        destination: 'https://yatimmandiri.org/news/wp-json/ymapi/v1/:path*',
      },
      {
        source: '/api/blog/:path*',
        destination: 'https://yatimmandiri.org/blog/wp-json/ymapi/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
