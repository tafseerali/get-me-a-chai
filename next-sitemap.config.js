// @ts-nocheck
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gmchai.vercel.app', // your Vercel URL
  generateRobotsTxt: true,              // creates robots.txt automatically
  changefreq: 'weekly',                 // default page change frequency
  priority: 0.8,                        // default page priority
  sitemapSize: 5000,                     // max URLs per sitemap
  exclude: ['/dashboard'],              // only exclude private dashboard
  // add static pages manually
  additionalPaths: async (config) => [
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/services'),
    await config.transform(config, '/users'),
    await config.transform(config, '/login'), // included login page
  ],
};
