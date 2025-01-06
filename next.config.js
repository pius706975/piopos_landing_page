/** @type {import('next').NextConfig} */
const JavaScriptObfuscator = require('webpack-obfuscator');

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },

    productionBrowserSourceMaps: false,

    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.plugins.push(
          new JavaScriptObfuscator(
            {
              rotateStringArray: true, 
              stringArray: true, 
              stringArrayThreshold: 0.75,
              compact: true, 
            },
            []
          )
        );
      }
  
      return config;
    },
  
  };
  
  module.exports = nextConfig;
  