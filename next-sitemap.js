module.exports = {
  siteUrl: 'https://theodorusclarence.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/admin/*' },
      { userAgent: '*', allow: '/' },
    ],
  },
};
