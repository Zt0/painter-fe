import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    basePath: '/fe',
    images: {
        domains: ['storage.googleapis.com'], // Add your trusted image domain here
    },
};

export default nextConfig;