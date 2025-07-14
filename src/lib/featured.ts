import type { ArticleFrontmatter, ProjectFrontmatter } from "./types";
import { getShortDescription, processContentInDir, ContentType } from "./utils";

export const featuredProjects = (
  await processContentInDir<ProjectFrontmatter, ProjectFrontmatter>(
    ContentType.Lab,
    (data) => {
      const shortDescription = getShortDescription(
        data.frontmatter.description,
      );
      return {
        title: data.frontmatter.title,
        description: shortDescription,
        tags: data.frontmatter.tags,
        githubUrl: data.frontmatter.githubUrl,
        liveUrl: data.frontmatter.liveUrl,
        featured: data.frontmatter.featured,
        timestamp: data.frontmatter.timestamp,
        filename: `/lab/${data.frontmatter.filename}`,
      };
    },
  )
)
  .sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  })
  .slice(0, 3);

export const featuredArticles = (
  await processContentInDir<ArticleFrontmatter, ArticleFrontmatter>(
    ContentType.Life,
      (data) => {
        const shortDescription = getShortDescription(
          data.frontmatter.description,
        );
        return {
          title: data.frontmatter.title,
          description: shortDescription,
          tags: data.frontmatter.tags,
          time: data.frontmatter.time,
          featured: data.frontmatter.featured,
          timestamp: data.frontmatter.timestamp,
          filename: `/life/${data.frontmatter.filename}`,
        };
      },
    )
  )
    .sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);