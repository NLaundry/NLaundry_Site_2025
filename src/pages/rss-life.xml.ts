import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { GLOBAL } from '../lib/variables';

export const GET: APIRoute = async (context) => {
  // Get all life articles (assuming they're in src/pages/life/)
  const lifeArticlesGlob = await import.meta.glob('./life/*.md', { eager: true });
  const lifeArticles = Object.values(lifeArticlesGlob) as any[];
  
  // Sort by date (newest first)
  const sortedArticles = lifeArticles
    .map(article => ({
      ...article.frontmatter,
      url: `/life/${article.frontmatter.filename}/`,
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return rss({
    title: `${GLOBAL.username} - Life`,
    description: GLOBAL.blogLongDescription,
    site: context.site!,
    items: sortedArticles.map((article) => ({
      title: article.title,
      pubDate: new Date(article.timestamp),
      description: article.description,
      link: article.url,
      categories: article.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
};