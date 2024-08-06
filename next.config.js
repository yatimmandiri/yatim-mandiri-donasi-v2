/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  env: {
    FACEBOOK_PIXEL_ID: '1079631253497318',
    FACEBOOK_PIXEL_ID2: '200810677896141',
    TIKTOK_PIXEL_ID: 'CD6D7UJC77U8TNJJ2MEG',
    GOOGLE_TAG_MANAGER_ID: 'GTM-W535XVCZ',
    GOOGLE_ANALYTICS_ID: 'G-6HF2NF32NE',
    hotjar: '3316015',
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'donasi.yatimmandiri.org',
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
      {
        protocol: 'https',
        hostname: 'api.midtrans.com',
      },
      {
        protocol: 'https',
        hostname: 'id.shp.ee',
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

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
});

module.exports = withPWA(nextConfig);
