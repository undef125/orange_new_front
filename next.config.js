/** @type {import('next').NextConfig} */
const nextConfig = {
  // localeDetection: true,
  images: {
    remotePatterns: [
      {
        // protocol: 'http',
        // hostname: 'localhost',
        protocol: "https",
        hostname: "api.apexgoo.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
