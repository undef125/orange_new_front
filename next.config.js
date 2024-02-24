/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'localhost',
              pathname: '**',
            },
          ],
    },
}

module.exports = nextConfig