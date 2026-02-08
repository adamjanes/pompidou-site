# Content Pipeline Scripts

Scripts for processing the Pompidou tool catalogue into site-ready content.

## Scripts

### `process-catalogue.ts`

Main processing script that:
- Reads all markdown files from `/Users/adamjanes/code/projects/pompidou/catalogue/`
- Parses frontmatter and content
- Transforms content to strip personal references
- Generates JSON index and individual tool files
- Outputs statistics

**Usage:**
```bash
npm run process-catalogue
```

**Output:**
- `content/tools-index.json` - Lightweight index of all tools
- `content/tools/*.json` - Individual tool detail files
- `content/stats.json` - Catalogue statistics

### `transform-content.ts`

Content transformation utilities used by the main pipeline:
- Strips personal references ("Adam's system" → "your system")
- Validates transformations
- Standalone functions for content processing

## Data Flow

1. **Source:** `/Users/adamjanes/code/projects/pompidou/catalogue/`
   - Organized by category (execution/, spec/, tasks/, etc.)
   - Markdown files with frontmatter
   - Personal references and decision rationale

2. **Processing:**
   - Parse frontmatter (gray-matter)
   - Transform content (strip personal refs)
   - Extract metadata and scores
   - Generate excerpts

3. **Output:** `content/` directory (gitignored, generated at build)
   - JSON files for fast loading
   - Processed and transformed content
   - Statistics and indexes

## Integration with Next.js

The `src/lib/content-loader.ts` module provides functions to load tools directly from source markdown at build time:

- `getAllTools()` - Load all tools
- `getToolBySlug(slug)` - Load single tool
- `getToolsByPhase(phase)` - Filter by phase
- `getToolsByCategory(category)` - Filter by category
- `filterTools(filter)` - Multi-criteria filtering
- `getToolCollection()` - Organized collection with indexes
- `getToolStats()` - Statistics

These can be used in Next.js:
- Server Components (direct import)
- Static Site Generation (generateStaticParams)
- API routes (if needed)

## Types

See `src/types/tool.ts` for:
- `Tool` - Full tool object
- `ToolMetadata` - Frontmatter fields
- `Phase`, `Category`, `Status` - Enums
- `EvaluationScores` - Scoring structure
- `ToolFilter` - Filtering criteria
- `ToolCollection` - Organized collection
