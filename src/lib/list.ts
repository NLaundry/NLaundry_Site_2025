import type { ArticleFrontmatter, ProjectFrontmatter, PoemFrontmatter, PublicationFrontmatter } from "./types";
import { getShortDescription, processContentInDir, ContentType } from "./utils";

export const articles = (
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
).sort((a, b) => {
  const dateA = new Date(a.timestamp);
  const dateB = new Date(b.timestamp);
  return dateB.getTime() - dateA.getTime();
});

export const projects = (
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
).sort((a, b) => {
  const dateA = new Date(a.timestamp);
  const dateB = new Date(b.timestamp);
  return dateB.getTime() - dateA.getTime();
});


export const poetry = (
  await processContentInDir<PoemFrontmatter, PoemFrontmatter>(
    ContentType.Poetry,
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
        filename: `/poetry/${data.frontmatter.filename}`,
      };
    },
  )
).sort((a, b) => {
  const dateA = new Date(a.timestamp);
  const dateB = new Date(b.timestamp);
  return dateB.getTime() - dateA.getTime();
});

export const publications = (
  await processContentInDir<PublicationFrontmatter, PublicationFrontmatter>(
    ContentType.Publications,
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
        filename: `/publications/${data.frontmatter.filename}`,
      };
    },
  )
).sort((a, b) => {
  const dateA = new Date(a.timestamp);
  const dateB = new Date(b.timestamp);
  return dateB.getTime() - dateA.getTime();
});