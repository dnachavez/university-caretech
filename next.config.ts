import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize for Vercel deployment
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ['vercel.app'],
  },
  // Increase serverless function timeout for API routes
  serverRuntimeConfig: {
    // Will only be available on the server side
    PROJECT_ROOT: __dirname,
  },
  env: {
    // Prisma Accelerate configuration
    DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {
    // Optimizations for Vercel
    serverActions: {
      bodySizeLimit: '5mb',
    },
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'lucide-react',
      'date-fns',
      'sonner',
    ],
  },
};

export default nextConfig;
