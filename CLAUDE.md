# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Architecture

This is an Astro-based personal website following a "Life and Lab" theme. The site is built with TypeScript, Tailwind CSS, and DaisyUI components.

### Content Structure

The site has four main content sections:
- **Life** (`/life/`): Philosophy articles exploring meaningful living and behavior change
- **Lab** (`/lab/`): Technical projects with GitHub repositories and live demos
- **Poetry** (`/poetry/`): Creative writing and poetry
- **Publications** (`/publications/`): Academic publications and research

### Key Architecture Files

- `src/lib/variables.ts`: Site-wide metadata, navigation, and text content
- `src/lib/types.ts`: TypeScript definitions for content frontmatter (ArticleFrontmatter, ProjectFrontmatter, PoemFrontmatter, PublicationFrontmatter)
- `src/lib/list.ts`: Content processing and sorting logic for all content types
- `src/lib/featured.ts`: Featured content selection for homepage (first 3 items)
- `src/lib/utils.ts`: Utility functions including content processing

### Content Management

All content is markdown files in `src/pages/` with frontmatter:
- Articles require: `title`, `description`, `tags`, `time`, `featured`, `timestamp`, `filename`
- Projects require: `title`, `description`, `tags`, `githubUrl`, `liveUrl`, `featured`, `timestamp`, `filename`
- Poetry requires: `title`, `description`, `tags`, `time`, `featured`, `timestamp`, `filename`
- Publications require: `title`, `description`, `tags`, `time`, `featured`, `timestamp`, `filename`

Content is automatically sorted by timestamp (newest first) and processed through `processContentInDir` utility.

### Layout System

- `src/layouts/Layout.astro`: Base layout with SEO, meta tags, and global structure
- `src/layouts/BlogLayout.astro`: Article-specific layout with structured data
- `src/layouts/ProjectLayout.astro`: Project-specific layout with GitHub/live links

### Component Structure

- `src/components/common/`: Reusable components (Section, Pagination, Anchor, StructuredData)
- `src/components/home/`: Homepage-specific components (Hero, About, Featured sections)
- `src/components/`: Content display components (ArticleSnippet, ProjectSnippet)

### Styling

- Global styles in `src/styles/global.css`
- Tailwind CSS with DaisyUI components
- Configuration in `astro.config.mjs` using `@tailwindcss/vite` plugin

### Navigation

Navigation structure is defined in `src/lib/variables.ts` under the `menu` object with routes for home, lab, life, poetry, publications, and coaching.

## Development Notes

- Content is processed at build time using Astro's file-based routing
- All content types support featured items for homepage display
- The site uses responsive design with dark/light mode support via DaisyUI
- SEO optimization is built into the layouts with structured data
- Based on the Zaggonaut Astro theme by RATIU5