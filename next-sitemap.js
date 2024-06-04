module.exports = {
  siteUrl:
    process.env.VERCEL_DEPLOYMENT === 'true'
      ? 'https://emackinnon.com'
      : 'https://emackinnon1.github.io/folio-v2',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
