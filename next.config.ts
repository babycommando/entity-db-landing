import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/v86/(.*)", // Add the appropriate route for which the headers are needed
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    // Override the default webpack configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      "onnxruntime-node$": false, // Disable onnxruntime-node for browser environments
      sharp$: false, // Disable sharp package (used by some image processing packages)
    };

    return config;
  },
  output: "export", // <=== enables static exports
  reactStrictMode: true,
};

module.exports = nextConfig;
