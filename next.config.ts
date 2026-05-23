import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ibtmpcpyulndpakzjxll.supabase.co',
      },
    ],
    qualities: [75, 95],
  },
};

export default nextConfig;