import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { GLOBAL } from '../lib/variables';

export const GET: APIRoute = async (context) => {
  // Get all lab/project articles
  const labArticlesGlob = await import.meta.glob('./lab/*.md', { eager: true });
  const labArticles = Object.values(labArticlesGlob) as any[];
  
  // Sort by date (newest first)
  const sortedArticles = labArticles
    .map(article => ({
      ...article.frontmatter,
      url: `/lab/${article.frontmatter.filename}/`,
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return rss({
    title: `${GLOBAL.username} - Lab`,
    description: GLOBAL.projectLongDescription,
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