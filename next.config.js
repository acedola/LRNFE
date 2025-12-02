/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'striking-bee-a1b63d1ef8.media.strapiapp.com', // <--- ESTE ES EL QUE FALTABA
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'striking-bee-a1b63d1ef8.strapiapp.com',      // <--- El de la API (por si acaso)
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
