# Pompidou Site

Public-facing website showcasing the Pompidou tool catalogue — a comprehensive guide to building autonomous AI development systems.

## Purpose

A shareable, browsable website that presents the Pompidou catalogue of 80+ evaluated tools for autonomous AI development. Designed for sharing on LinkedIn and with other developers building similar systems.

**Key audience:**
- Developers building AI-powered development workflows
- Engineering leaders exploring autonomous development
- AI researchers interested in practical tooling

**Tone:** Generic ("your autonomous dev system") but maintains the Holy Grail framework and phased approach.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16 | React framework with App Router |
| **React** | 19 | UI library |
| **TypeScript** | Latest | Type safety |
| **Tailwind CSS** | 4 | Styling |
| **Vercel** | - | Hosting & deployment |

## Content Strategy

**Source:** Pulls from `/Users/adamjanes/code/projects/pompidou/catalogue/` markdown files

**Structure:**
- Home: Holy Grail framework overview (5 phases + platform)
- Catalogue: Browsable tool grid with filters by category/phase
- Tool detail pages: Full evaluation (pros, cons, integration, scoring)
- Stack: Recommended combinations (current decisions)
- About: Methodology & evaluation criteria

**Content transformations:**
- Strip personal references ("Adam's system" → "your system")
- Keep technical details and evaluation scores
- Maintain the Holy Grail narrative (Spec It → Task It → Build It → Verify It → Learn It)
- Preserve decision rationale and trade-offs

## Directory Structure

```
pompidou-site/
├── CLAUDE.md                    # This file
├── .openspec/                   # OpenSpec specification
├── src/
│   ├── app/                     # Next.js App Router pages
│   ├── components/              # React components
│   ├── lib/                     # Utilities & data fetching
│   └── styles/                  # Global styles
├── public/                      # Static assets
├── content/                     # Processed markdown (gitignored - generated)
└── scripts/                     # Build-time content processing
```

## Development Workflow

This is a **project** (greenfield) — direct push OK:
- Can push directly to main
- Deploy previews via Vercel
- Content syncs from main pompidou catalogue

## Content Pipeline

1. **Build time:** Scripts read from `../pompidou/catalogue/`
2. **Transform:** Strip personal references, extract frontmatter
3. **Generate:** Static pages via Next.js SSG
4. **Deploy:** Vercel auto-deploys on push to main

## Key Features

- **Filterable catalogue:** By phase, category, status (CHOSEN/CANDIDATE/REJECTED)
- **Comparison tables:** Side-by-side tool comparisons within categories
- **Search:** Full-text search across tool descriptions
- **Responsive:** Mobile-first design
- **Fast:** Static generation, optimized for performance
- **SEO:** Proper meta tags, OpenGraph, structured data

## Development Workflow (Holy Grail)

### Phase 1: Spec It (OpenSpec)
- `/opsx:new` — Create feature proposal
- `/opsx:continue` — Develop specs
- `/opsx:apply` — Apply approved changes to codebase

### Phase 2: Task It (Beads)
- `bd add "task description"` — Break down into tasks
- `bd list --unblocked` — See what's ready to work on
- `bd start <task-id>` — Mark task as in-progress
- `bd done <task-id>` — Mark task as complete

### Phase 3: Build It (OMC)
- `omc autopilot "feature description"` — Standard autonomous build (32 specialized agents, TDD, code review)
- `omc ultrapilot "large feature"` — 3-5x parallel execution for complex features
- `omc ecomode "small task"` — Token-efficient mode for simple changes
- `omc ralph "implement X"` — Direct execution mode (skip planning overhead)
- `omc swarm "research topic"` — Multi-agent research and exploration

### Phase 4: Verify It
- `npm run lint` — ESLint checks
- `npm run build` — Production build validation

### Phase 5: Learn It
- `/harvest` — Capture learnings to knowledge/updates/

## Git Configuration

**Account:** Personal (adamjanes/pompidou-site)
- Email: Adam.Michael.Janes@gmail.com
- Push directly to main

## Environment Setup

**Local development:**
```bash
npm install
npm run dev
```

**Build:**
```bash
npm run build
```

**Deploy:**
Push to main → Vercel auto-deploys

## Content Ownership

Content is sourced from the main Pompidou project but presented generically. The site is:
- **Public** — shareable on social media
- **Educational** — helps others build similar systems
- **Current** — reflects latest evaluations and decisions
- **Opinionated** — includes real evaluation scores and recommendations
