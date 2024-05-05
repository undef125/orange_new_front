/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // i18n: {
  //   locales: ['en', 'es'], // Replace with your desired locales (e.g., 'fr', 'de')
  //   defaultLocale: 'en', // Set the default language
  // },
  localeDetection: true,
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
