import type { NextConfig } from 'next';
import dns from 'dns'

dns.setDefaultResultOrder('ipv4first')
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