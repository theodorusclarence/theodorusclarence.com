/**
 * @type {import('next').NextConfig}
 */
module.exports = {
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
};
