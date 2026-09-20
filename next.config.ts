import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Demo mode — no external API calls
  // Supabase can be added later via environment variables
  images: {
    remotePatterns: [],
    unoptimized: true, // For static export compatibility
  },
};

export default nextConfig;
