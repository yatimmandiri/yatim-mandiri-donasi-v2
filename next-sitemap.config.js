/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://donasi.yatimmandiri.org',
  generateRobotsTxt: true, // (optional)
  sourceDir: 'build',
  // ...other options
};
