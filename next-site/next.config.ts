import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Trailing slashes so Next's routes match Jekyll's `permalink: pretty`
  // output (/writing/foo/) exactly. URL parity is non-negotiable.
  trailingSlash: true,
};

export default nextConfig;
