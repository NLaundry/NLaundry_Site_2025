import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { GLOBAL } from '../lib/variables';

export const GET: APIRoute = async (context) => {
  // Get all articles from both life and lab
  const [lifeArticlesGlob, labArticlesGlob] = await Promise.all([
    import.meta.glob('./life/*.md', { eager: true }),
    import.meta.glob('./lab/*.md', { eager: true })
  ]);
  
  const lifeArticles = Object.values(lifeArticlesGlob) as any[];
  const labArticles = Object.values(labArticlesGlob) as any[];
  
  // Combine and sort by date (newest first)
  const allArticles = [
    ...lifeArticles.map(article => ({
      ...article.frontmatter,
      url: `/life/${article.frontmatter.filename}/`,
      category: 'Life'
    })),
    ...labArticles.map(article => ({
      ...article.frontmatter,
      url: `/lab/${article.frontmatter.filename}/`,
      category: 'Lab'
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return rss({
    title: `${GLOBAL.username} - Life and Lab`,
    description: GLOBAL.longDescription,
    site: context.site!,
    items: allArticles.map((article) => ({
      title: article.title,
      pubDate: new Date(article.timestamp),
      description: article.description,
      link: article.url,
      categories: [article.category, ...(article.tags || [])],
    })),
    customData: `<language>en-us</language>`,
  });
};