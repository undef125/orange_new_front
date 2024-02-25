/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'api.apexgoo.com',
              pathname: '**',
            },
          ],
    },
}

module.exports = nextConfig