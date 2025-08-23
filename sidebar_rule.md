# Docsify _sidebar.md Authoring Rules

Files referenced:
- /Users/gearzhan/cProjects/docWiki/index.html
- /Users/gearzhan/cProjects/docWiki/docs/_sidebar.md

1) Location and enabling
- Place the sidebar file at docs/_sidebar.md.
- Ensure sidebar loading is enabled in index.html: set loadSidebar: true.
- To reuse a single sidebar across all routes, set alias: { '/.*/_sidebar.md': '/_sidebar.md' } in window.$docsify.

2) Structure and depth
- Organize links by sections (e.g., Getting Started, Documentation, Resources).
- Keep the hierarchy shallow: at most two levels (section -> page -> optional page headings via subMaxLevel).
- Prefer stable slugs: use folder/README.md as a landing page for a section.

3) Link patterns
- Root home: [Home](/)
- Same-folder pages: [Guide](guide.md)
- Nested pages: [Getting Started](tutorials/getting-started.md)
- You may append a custom title for SEO: [Guide](guide.md "The greatest guide in the world")

4) Auto-generated table of contents (TOC)
- Control TOC depth via subMaxLevel in index.html (e.g., subMaxLevel: 2).
- Hide a specific header from TOC by appending: <!-- {docsify-ignore} -->
- Hide all headers on a page from TOC using: <!-- {docsify-ignore-all} --> on the first header of that page.

5) Example template for docs/_sidebar.md

- Getting Started
  - [Home](/)
  - [User Guide](guide/README.md)
- Documentation
  - [Tutorials](tutorials/getting-started.md)
  - [API Reference](api/README.md)
- Resources
  - [About Project](about/about.md)
  - [FAQ](faq/README.md)

6) Notes for this project
- index.html uses basePath: '/docs/', so links like [Home](/) correctly resolve to docs/README.md.
- The alias { '/.*/_sidebar.md': '/_sidebar.md' } (relative to basePath) ensures a single sidebar file is used across all routes.

7) Maintenance tips
- Keep section names concise; avoid more than ~7 items per section for readability.
- Use consistent casing and titles to match page H1s.
- Validate links after moving or renaming files; broken links degrade UX.
- Prefer meaningful ordering (onboarding → core → references → resources).