# Content Loading Utilities

Library modules for loading and processing Pompidou tool catalogue.

## Modules

### `content-loader.ts`

Main content loading API. Use these functions in Next.js pages and components:

```typescript
import { getAllTools, getToolBySlug, filterTools } from '@/lib/content-loader';
import { Phase, Category, Status } from '@/types/tool';

// Load all tools
const tools = getAllTools();

// Load single tool by slug
const omc = getToolBySlug('omc');

// Filter by phase
const buildTools = getToolsByPhase(Phase.BUILD_IT);

// Filter by multiple criteria
const chosenBuildTools = filterTools({
  phase: Phase.BUILD_IT,
  status: Status.CHOSEN
});

// Search
const searched = filterTools({
  search: 'autonomous execution'
});

// Get organized collection
const collection = getToolCollection();
console.log(collection.byPhase[Phase.SPEC_IT]);
console.log(collection.byStatus[Status.CHOSEN]);

// Get statistics
const stats = getToolStats();
console.log(stats.total); // Total number of tools
console.log(stats.byPhase); // Tools per phase
```

### `markdown-processor.ts`

Low-level markdown processing utilities:

```typescript
import {
  parseMarkdown,
  transformContent,
  extractExcerpt,
  markdownToHtml
} from '@/lib/markdown-processor';

// Parse markdown with frontmatter
const { frontmatter, content, transformedContent } = parseMarkdown(fileContent);

// Transform content (strip personal references)
const transformed = transformContent(originalContent);

// Extract excerpt
const excerpt = extractExcerpt(content, 200);

// Convert to HTML (async)
const html = await markdownToHtml(markdown);
```

## Usage in Next.js

### Server Components (Recommended)

```typescript
// app/catalogue/page.tsx
import { getAllTools } from '@/lib/content-loader';

export default function CataloguePage() {
  const tools = getAllTools();

  return (
    <div>
      {tools.map(tool => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
```

### Static Site Generation

```typescript
// app/tool/[slug]/page.tsx
import { getAllTools, getToolBySlug } from '@/lib/content-loader';

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map(tool => ({ slug: tool.slug }));
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <div>
      <h1>{tool.name}</h1>
      <p>{tool.tagline}</p>
      <div dangerouslySetInnerHTML={{ __html: tool.content }} />
    </div>
  );
}
```

### With Filtering

```typescript
// app/phase/[phase]/page.tsx
import { getToolsByPhase } from '@/lib/content-loader';
import { Phase } from '@/types/tool';

export default function PhasePage({ params }: { params: { phase: string } }) {
  const tools = getToolsByPhase(params.phase as Phase);

  return (
    <div>
      <h1>{params.phase} Tools</h1>
      {tools.map(tool => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
```

## Performance Notes

- All loading happens at **build time** (SSG)
- Content is read directly from source markdown files
- No runtime processing overhead
- Tools are cached during build
- Optional JSON caching via `scripts/process-catalogue.ts`

## Data Structure

```typescript
{
  name: "Oh-My-ClaudeCode",
  slug: "omc",
  phase: "build-it",
  category: "execution",
  status: "CHOSEN",
  tagline: "32 specialized agents for autonomous execution",
  repo: "https://github.com/...",
  docs: "https://...",
  scores: {
    autonomy: 9.5,
    reliability: 8.5,
    integration: 9.0,
    overall: 9.0
  },
  pros: ["Highly autonomous", "Model routing"],
  cons: ["Token intensive", "Complex setup"],
  content: "# Oh-My-ClaudeCode\n\n...", // Transformed markdown
  rawContent: "# Oh-My-ClaudeCode\n\n...", // Original markdown
  excerpt: "First paragraph..."
}
```
