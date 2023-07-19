const path = require('path');

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [path.resolve(__dirname, 'src', 'contents')],
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: [
      'res.cloudinary.com',

      // Spotify Album
      'i.scdn.co',
    ],
  },
  redirects: async () => [
    {
      source: '/library/:slug',
      destination: '/shorts/:slug',
      permanent: true,
    },
  ],
};

module.exports = withRemoteRefresh(nextConfig);
