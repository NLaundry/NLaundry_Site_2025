# Nathan Laundry - Personal Website 2025

This is my personal website built with Astro, featuring my philosophy articles, technical projects, poetry, and academic publications. I have life for philosphy and vibes, and lab for technical stuff.

## About This Site

AI said "this site serves as my digital garden" ... I don't know what the f*ck that means:

- **Life**: pseudo-intellectual rambles cause I read Sartre one time and some psychology of behaviour change stuff
- **Lab**: Technical projects with GitHub repositories and youtube video links
- **Coaching**: Personal coaching services

*Note: Poetry and Publications sections exist in the codebase but are currently hidden from public view.*

## Features

Thanks to a great template and claude code (I don't ever want to do frontend. Can you tell?)

- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Mode**: Automatic theme switching with DaisyUI
- **SEO Optimized**: Built with SEO best practices and structured data
- **Performance**: Optimized for fast loading
- **Accessibility**: Fully accessible design
- **Pagination**: Clean pagination for all content sections
- **Tag System**: Organized content with tags and categories
- **RSS Feeds**: Separate RSS feeds for each content type

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.3.1 - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4.0.8 + [DaisyUI](https://daisyui.com/) v5.0.0
- **Language**: TypeScript
- **Additional Tools**: Sharp for image optimization, RSS & Sitemap generation
- **Deployment**: Static hosting ready

## Development

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

This is an Astro-based personal website with the following structure:

### Content Structure

All content is stored as markdown files in `src/pages/` with frontmatter:
- `src/pages/life/` - Philosophy articles and life content
- `src/pages/lab/` - Technical projects and code
- `src/pages/coaching.astro` - Coaching services page
- `src/pages/poetry/` - Creative writing and poetry (hidden from navigation)
- `src/pages/publications/` - Academic publications (hidden from navigation)

### Key Architecture Files

- `src/lib/variables.ts` - Site-wide metadata, navigation, and text content
- `src/lib/types.ts` - TypeScript definitions for content frontmatter
- `src/lib/list.ts` - Content processing and sorting logic
- `src/lib/featured.ts` - Featured content selection for homepage
- `src/lib/utils.ts` - Utility functions including content processing

### Layout System

- `src/layouts/Layout.astro` - Base layout with SEO, meta tags, and global structure
- `src/layouts/BlogLayout.astro` - Article-specific layout with structured data
- `src/layouts/ProjectLayout.astro` - Project-specific layout with GitHub/live links

### Content Management

Content is automatically sorted by timestamp (newest first) and processed through utility functions. Each content type requires specific frontmatter fields:
- Articles: `title`, `description`, `tags`, `time`, `featured`, `timestamp`, `filename`
- Projects: `title`, `description`, `tags`, `githubUrl`, `liveUrl`, `featured`, `timestamp`, `filename`
- Poetry: `title`, `description`, `tags`, `time`, `featured`, `timestamp`, `filename`
- Publications: `title`, `description`, `tags`, `time`, `featured`, `timestamp`, `filename`

## Customization

The site is fully customizable through:
- `src/lib/variables.ts` - Site-wide text and metadata
- `src/styles/global.css` - Global styles and CSS variables
- `astro.config.mjs` - Astro and Tailwind configuration

## Credits

This website is built on the excellent [Zaggonaut](https://github.com/RATIU5/zaggonaut) Astro theme by [RATIU5](https://github.com/RATIU5). The original theme provided the foundation for this site's design and functionality.

**Original Theme**: [Zaggonaut - Retro-inspired Astro Theme](https://zaggonaut.dev)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by Nathan Laundry
