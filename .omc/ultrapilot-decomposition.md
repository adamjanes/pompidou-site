# ULTRAPILOT TASK DECOMPOSITION

## Task Overview
Build 4 core features for Pompidou Site from OpenSpec changes directory

## Worker Assignments (File Ownership)

### WORKER 1: Content Pipeline
**Files Owned:**
- `scripts/process-catalogue.ts`
- `scripts/transform-content.ts`
- `src/lib/content-loader.ts`
- `src/lib/markdown-processor.ts`
- `src/types/tool.ts`

**Task:** Build content pipeline to read from `../pompidou/catalogue/`, transform markdown, strip personal references, extract frontmatter, and generate static data

**Dependencies:** None (can start immediately)

---

### WORKER 2: Tool Browse View
**Files Owned:**
- `src/app/catalogue/page.tsx`
- `src/components/ToolGrid.tsx`
- `src/components/ToolCard.tsx`

**Task:** Build catalogue browsing page with grid layout showing all tools

**Dependencies:** WORKER 1 (needs content types and data loading)

---

### WORKER 3: Tool Detail Pages
**Files Owned:**
- `src/app/catalogue/[slug]/page.tsx`
- `src/components/ToolDetail.tsx`
- `src/components/EvaluationScore.tsx`

**Task:** Build individual tool detail pages with full evaluation, pros/cons, integration notes

**Dependencies:** WORKER 1 (needs content types and data loading)

---

### WORKER 4: Category & Phase Filtering
**Files Owned:**
- `src/components/FilterBar.tsx`
- `src/components/PhaseFilter.tsx`
- `src/components/CategoryFilter.tsx`
- `src/components/StatusFilter.tsx`
- `src/lib/filter-utils.ts`

**Task:** Build filtering UI and logic for catalogue page (filter by phase, category, status)

**Dependencies:** WORKER 2 (integrates with catalogue page)

---

## Shared Files (Sequential Handling)
- `package.json` - may need dependencies (gray-matter, remark, etc.)
- `tsconfig.json` - may need path aliases
- `next.config.ts` - may need static export config

## Execution Plan

### Parallel Phase 1
- WORKER 1 (Content Pipeline) - START IMMEDIATELY

### Parallel Phase 2 (after Worker 1 completes)
- WORKER 2 (Tool Browse View)
- WORKER 3 (Tool Detail Pages)

### Parallel Phase 3 (after Worker 2 completes)
- WORKER 4 (Filtering) - depends on catalogue page

### Integration Phase
- Install shared dependencies
- Integrate filtering with catalogue page
- Final validation

## Success Criteria
- Content pipeline can read and transform catalogue markdown
- Catalogue page displays tools in grid
- Individual tool pages render full content
- Filters work on catalogue page
- All TypeScript compiles
- Next.js builds successfully
