# Press

A bookshelf of Christian books.

This project follows the [Palmshed Engineering Philosophy](https://github.com/palmshed/palmshed.github.io/blob/main/PHILOSOPHY.md).

## What it includes

- 14 books with editorially written descriptions
- 11 authors with biographies
- 8 publishers
- 15 collections by topic and tradition
- 8 reading lists
- Browse by Scripture reference
- Client-side search
- Editorial policy
- Editorial contact
- Accessibility panel with theme, text size, spacing, contrast, and font preferences
- Reading mode on book detail pages
- GitHub Pages deployment via GitHub Actions
- Capacitor mobile apps for Android and iOS

## Getting started

### Web

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`

### Mobile (Android / iOS)

1. Run `npm run build:app` (builds with empty basePath for Capacitor)
2. Run `npm run cap:sync` (syncs web assets to native projects)
3. Run `npm run cap:open:android` or `npm run cap:open:ios`

## Adding a book

Edit `content/books.json`. Each book requires:

- `id` and `title`
- `author` and `authorSlug`
- `description` written in neutral, descriptive language
- `categories`, `tags`, and `subjects`
- `availability` with links labeled as "View at..."

## Editorial voice

Press uses quiet, respectful, precise language. Descriptions use words like "explores," "examines," "argues," and "reflects on." They avoid "brilliant," "powerful," "essential," and "groundbreaking."

See the [editorial policy](https://bniladridas.github.io/press/editorial-policy) for full details.

## Deployment

Push to `main`. The GitHub Actions workflow builds the site and deploys to GitHub Pages automatically.

## Built on

Press is built on the ideas established in [palmshed/base](https://github.com/palmshed/base), a reusable foundation for static-first websites.

## License

MIT
