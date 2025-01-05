import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Override the default webpack configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      "onnxruntime-node$": false, // Disable onnxruntime-node for browser environments
      sharp$: false, // Disable sharp package (used by some image processing packages)
    };

    return config;
  },
  output: "export",
  reactStrictMode: true,
};

module.exports = nextConfig;
