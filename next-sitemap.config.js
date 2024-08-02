/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://next.yatimmandiri.org',
  generateRobotsTxt: true, // (optional)
  sourceDir: 'build',
  // ...other options
};
