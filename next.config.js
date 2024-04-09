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
              // hostname: '192.168.1.70',
              protocol: 'https',
              hostname: 'api.apexgoo.com',
              // pathname: '**',
            },
          ],
    },
}

module.exports = nextConfig 