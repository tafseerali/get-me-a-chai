// next-sitemap.config.js

// 1. Define your site's base URL (VERY IMPORTANT)
const siteUrl = 'https://gmchai.vercel.app'; 

// 2. Mock a function to fetch your data from MongoDB/API
//    ⚠️ REPLACE THIS WITH YOUR ACTUAL DATABASE FETCH FUNCTION ⚠️
async function getCreatorSlugs() {
  // In a real app, this would query your MongoDB to get a list of all 
  // creator slugs, e.g., ['johndoe', 'creator-x', 'tea-lover']
  
  // For the purpose of testing, we use a simple array:
  return [
    { slug: 'johndoe', lastModified: new Date('2025-10-30') },
    { slug: 'creator-x', lastModified: new Date('2025-10-25') },
    { slug: 'tea-lover', lastModified: new Date('2025-10-01') },
  ];
}


module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.8,
  
  // 3. Use the 'additionalPaths' function to fetch and include dynamic pages
  additionalPaths: async (config) => {
    // Fetch all the creator data
    const creators = await getCreatorSlugs();
    
    // Map the creator data to sitemap path objects
    const creatorPaths = creators.map((creator) => ({
      loc: `${siteUrl}/${creator.slug}`, // The full URL path (e.g., https://gmchai.vercel.app/johndoe)
      lastModified: creator.lastModified,
      changefreq: 'weekly',
      priority: 0.7, // Slightly lower priority than the homepage
    }));

    return creatorPaths;
  },
};