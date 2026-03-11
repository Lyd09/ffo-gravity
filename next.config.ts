
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
// output: 'export',
  serverExternalPackages: [
    'genkit',
    '@genkit-ai/ai',
    '@genkit-ai/googleai',
    '@genkit-ai/google-genai',
    '@genkit-ai/next',
    '@genkit-ai/dotprompt',
  ],
  experimental: {
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
