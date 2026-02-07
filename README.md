# Pompidou Site

Public-facing website showcasing the Pompidou tool catalogue for building autonomous AI development systems.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vercel** - Hosting & deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Source

Content is sourced from `/Users/adamjanes/code/projects/pompidou/catalogue/` and transformed to be generic and shareable.

## Project Structure

```
pompidou-site/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   └── lib/              # Utilities
├── public/               # Static assets
├── content/              # Generated content (gitignored)
└── scripts/              # Build-time processing
```

## Deployment

Pushes to main automatically deploy to Vercel.

## Learn More

See [CLAUDE.md](./CLAUDE.md) for full project context and development guidelines.
