# Press

A bookshelf of Christian books.

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

## Getting started

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`

## Adding a book

Edit `content/books.json`. Each book requires:

- `id` and `title`
- `author` and `authorSlug`
- `description` written in neutral, descriptive language
- `categories`, `tags`, and `subjects`
- `availability` with links labeled as "View at..."

## Editorial voice

Press uses quiet, respectful, precise language. Descriptions use words like "explores," "examines," "argues," and "reflects on." They avoid "brilliant," "powerful," "essential," and "groundbreaking."

See `/editorial-policy` for full details.

## Deployment

Push to `main`. The GitHub Actions workflow builds the site and deploys to GitHub Pages automatically.

## Built on

Press is built on the ideas established in [palmshed/base](https://github.com/palmshed/base), a reusable foundation for static-first websites.

## License

MIT
