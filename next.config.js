/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.icmemployment.net',
        port: '', // Laissez vide si le port par défaut (443 pour HTTPS) est utilisé
        pathname: '/uploads/**', // Correspond aux chemins des images
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Laissez vide si le port par défaut (443 pour HTTPS) est utilisé
        pathname: '/uploads/**', // Correspond aux chemins des images
      },
    ],
  },
  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    return config;
  },
};

module.exports = nextConfig;
