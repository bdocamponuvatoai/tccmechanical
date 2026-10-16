import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Static export has no image server. Photos are pre-resized by
    // scripts/images.mjs and served through image-loader.ts as a real srcset.
    loader: 'custom',
    loaderFile: './image-loader.ts',
    deviceSizes: [640, 960, 1536],
    imageSizes: [320],
  },
};

export default config;
