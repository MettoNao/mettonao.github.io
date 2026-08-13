# AGENTS.md

## Project

This repository contains the official static website for:

FFFF: Fatal Five Finger Fillet

The website must be deployable directly to GitHub Pages.

## Source of truth

Before writing or modifying copy, inspect:

- `content/press-info.txt`

Do not invent game features, release information, platform information,
pricing, quotes, awards, reviews, or claims that are not supported by
the provided source files.

Use the supplied text as the primary source of factual information.

## Visual assets

Inspect and use the local files in:

- `assets/images/`
- `assets/videos/`
- `references/`

Do not replace supplied artwork or screenshots with AI-generated
alternatives unless explicitly requested.

Choose images based on their actual content and suitability for the
section.

Do not rename source media unnecessarily.

## Website requirements

Build a static website only.

Allowed:

- HTML5
- CSS3
- Vanilla JavaScript

Do not introduce:

- React
- Next.js
- Vue
- Vite
- npm dependencies
- databases
- APIs
- authentication
- server-side code
- analytics
- cookies
- localStorage

The final website must work on GitHub Pages.

## Paths

All site assets must use relative paths.

Examples:

- `./styles.css`
- `./script.js`
- `./assets/images/keyart.jpg`
- `./assets/videos/trailer.mp4`

Do not use root-relative asset paths such as:

- `/styles.css`
- `/assets/images/keyart.jpg`

The site must also work when hosted under a GitHub Pages project path.

## Content

Do not invent marketing copy when usable copy already exists in
`content/press-info.txt`.

Preserve official terminology.

Do not alter:

- game title
- developer name
- publisher name
- platform
- release date
- Steam URL
- social URLs

unless the source material has been updated.

## Video

Use HTML5 `<video>` for supplied local video files where appropriate.

Do not autoplay videos with sound.

Prefer:

- `muted`
- `playsinline`
- `poster`
- user controls where appropriate

Respect `prefers-reduced-motion`.

## Accessibility

- Semantic HTML
- `lang="en"` for the English site
- Appropriate alt text
- Visible keyboard focus
- Keyboard-operable navigation
- Sufficient text contrast
- No essential information available only through animation

## Responsive design

Verify at minimum:

- 360px
- 768px
- 1440px

Avoid horizontal overflow.

## Validation

Before declaring the task complete:

1. Inspect all local source material.
2. Check all asset paths.
3. Check for missing files.
4. Check for broken internal links.
5. Check browser console errors.
6. Check responsive layout.
7. Confirm GitHub Pages compatibility.
8. Confirm no unsupported facts were invented.

## Editing policy

Make changes directly in the repository.

Do not only describe proposed changes.

After implementation, summarize:

- files changed
- major design decisions
- validation performed
- anything that could not be verified