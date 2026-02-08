import fs from 'fs';
import path from 'path';
import { Tool, Phase, Category, Status, ToolCollection, CatalogueFilter, SearchResult, CatalogueStats } from '@/types';
import { extractExcerpt, calculateAverageScore } from './utils';

// Cache for tools data
let toolsCache: Tool[] | null = null;

/**
 * Load all tools from the JSON file
 */
export async function getAllTools(): Promise<Tool[]> {
  if (toolsCache) {
    return toolsCache;
  }

  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, 'tools.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Transform and enrich tools
    toolsCache = data.tools.map((tool: any) => ({
      ...tool,
      excerpt: tool.excerpt || extractExcerpt(tool.content),
    }));

    return toolsCache ?? [];
  } catch (error) {
    console.error('Error loading tools:', error);
    return [];
  }
}

/**
 * Get a single tool by slug
 */
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const tools = await getAllTools();
  return tools.find((tool) => tool.slug === slug) || null;
}

/**
 * Get tools filtered by phase
 */
export async function getToolsByPhase(phase: Phase): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter((tool) => tool.phase === phase);
}

/**
 * Get tools filtered by category
 */
export async function getToolsByCategory(category: Category): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter((tool) => tool.category === category);
}

/**
 * Get tools filtered by status
 */
export async function getToolsByStatus(status: Status): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter((tool) => tool.status === status);
}

/**
 * Get tools with multiple filters applied
 */
export async function getFilteredTools(filter: CatalogueFilter): Promise<Tool[]> {
  let tools = await getAllTools();

  // Apply phase filter
  if (filter.phase) {
    const phases = Array.isArray(filter.phase) ? filter.phase : [filter.phase];
    tools = tools.filter((tool) => phases.includes(tool.phase));
  }

  // Apply category filter
  if (filter.category) {
    const categories = Array.isArray(filter.category) ? filter.category : [filter.category];
    tools = tools.filter((tool) => categories.includes(tool.category));
  }

  // Apply status filter
  if (filter.status) {
    const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
    tools = tools.filter((tool) => statuses.includes(tool.status));
  }

  // Apply search filter
  if (filter.search) {
    const searchResults = await searchTools(filter.search);
    const searchSlugs = new Set(searchResults.map((r) => r.tool.slug));
    tools = tools.filter((tool) => searchSlugs.has(tool.slug));
  }

  return tools;
}

/**
 * Full-text search across tools
 */
export async function searchTools(query: string): Promise<SearchResult[]> {
  const tools = await getAllTools();
  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const tool of tools) {
    let score = 0;
    const matchedFields: string[] = [];

    // Search in name (highest weight)
    if (tool.name.toLowerCase().includes(lowerQuery)) {
      score += 10;
      matchedFields.push('name');
    }

    // Search in tagline
    if (tool.tagline?.toLowerCase().includes(lowerQuery)) {
      score += 5;
      matchedFields.push('tagline');
    }

    // Search in description/content
    if (tool.content.toLowerCase().includes(lowerQuery)) {
      score += 3;
      matchedFields.push('content');
    }

    // Search in pros
    if (tool.pros?.some((pro) => pro.toLowerCase().includes(lowerQuery))) {
      score += 2;
      matchedFields.push('pros');
    }

    // Search in cons
    if (tool.cons?.some((con) => con.toLowerCase().includes(lowerQuery))) {
      score += 2;
      matchedFields.push('cons');
    }

    // Search in category
    if (tool.category.toLowerCase().includes(lowerQuery)) {
      score += 1;
      matchedFields.push('category');
    }

    if (score > 0) {
      results.push({ tool, score, matchedFields });
    }
  }

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Get related tools based on category and phase
 */
export async function getRelatedTools(toolSlug: string, limit: number = 3): Promise<Tool[]> {
  const tool = await getToolBySlug(toolSlug);
  if (!tool) return [];

  const tools = await getAllTools();

  // Filter out the current tool and prioritize same category, then same phase
  const related = tools
    .filter((t) => t.slug !== toolSlug)
    .map((t) => {
      let score = 0;
      if (t.category === tool.category) score += 10;
      if (t.phase === tool.phase) score += 5;
      if (t.status === tool.status) score += 2;
      return { tool: t, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.tool);

  return related;
}

/**
 * Get catalogue statistics
 */
export async function getCatalogueStats(): Promise<CatalogueStats> {
  const tools = await getAllTools();

  // Count by phase
  const byPhase: Record<Phase, number> = {
    [Phase.SPEC_IT]: 0,
    [Phase.TASK_IT]: 0,
    [Phase.BUILD_IT]: 0,
    [Phase.VERIFY_IT]: 0,
    [Phase.LEARN_IT]: 0,
    [Phase.PLATFORM]: 0,
  };

  // Count by category
  const byCategory: Record<Category, number> = {
    [Category.CONTEXT]: 0,
    [Category.EXECUTION]: 0,
    [Category.MEMORY]: 0,
    [Category.MONITORING]: 0,
    [Category.NATIVE]: 0,
    [Category.NOTIFICATION]: 0,
    [Category.ORCHESTRATION]: 0,
    [Category.PROCESS]: 0,
    [Category.SCHEDULING]: 0,
    [Category.SECURITY]: 0,
    [Category.SPEC]: 0,
    [Category.TASKS]: 0,
    [Category.WORKTREE]: 0,
  };

  // Count by status
  const byStatus: Record<Status, number> = {
    [Status.CHOSEN]: 0,
    [Status.CANDIDATE]: 0,
    [Status.REJECTED]: 0,
  };

  // Collect scores for averaging
  const allScores = {
    autonomy: [] as number[],
    reliability: [] as number[],
    integration: [] as number[],
    maintenance: [] as number[],
    overall: [] as number[],
  };

  for (const tool of tools) {
    byPhase[tool.phase]++;
    byCategory[tool.category]++;
    byStatus[tool.status]++;

    if (tool.scores) {
      if (tool.scores.autonomy !== undefined) allScores.autonomy.push(tool.scores.autonomy);
      if (tool.scores.reliability !== undefined) allScores.reliability.push(tool.scores.reliability);
      if (tool.scores.integration !== undefined) allScores.integration.push(tool.scores.integration);
      if (tool.scores.maintenance !== undefined) allScores.maintenance.push(tool.scores.maintenance);
      if (tool.scores.overall !== undefined) allScores.overall.push(tool.scores.overall);
    }
  }

  return {
    totalTools: tools.length,
    byPhase,
    byCategory,
    byStatus,
    averageScores: {
      autonomy: calculateAverageScore(allScores.autonomy),
      reliability: calculateAverageScore(allScores.reliability),
      integration: calculateAverageScore(allScores.integration),
      maintenance: calculateAverageScore(allScores.maintenance),
      overall: calculateAverageScore(allScores.overall),
    },
  };
}

/**
 * Get organized tool collection by phase, category, and status
 */
export async function getToolCollection(): Promise<ToolCollection> {
  const tools = await getAllTools();

  const byPhase: Record<Phase, Tool[]> = {
    [Phase.SPEC_IT]: [],
    [Phase.TASK_IT]: [],
    [Phase.BUILD_IT]: [],
    [Phase.VERIFY_IT]: [],
    [Phase.LEARN_IT]: [],
    [Phase.PLATFORM]: [],
  };

  const byCategory: Record<Category, Tool[]> = {
    [Category.CONTEXT]: [],
    [Category.EXECUTION]: [],
    [Category.MEMORY]: [],
    [Category.MONITORING]: [],
    [Category.NATIVE]: [],
    [Category.NOTIFICATION]: [],
    [Category.ORCHESTRATION]: [],
    [Category.PROCESS]: [],
    [Category.SCHEDULING]: [],
    [Category.SECURITY]: [],
    [Category.SPEC]: [],
    [Category.TASKS]: [],
    [Category.WORKTREE]: [],
  };

  const byStatus: Record<Status, Tool[]> = {
    [Status.CHOSEN]: [],
    [Status.CANDIDATE]: [],
    [Status.REJECTED]: [],
  };

  for (const tool of tools) {
    byPhase[tool.phase].push(tool);
    byCategory[tool.category].push(tool);
    byStatus[tool.status].push(tool);
  }

  return {
    tools,
    byPhase,
    byCategory,
    byStatus,
  };
}

/**
 * Get all unique categories from tools
 */
export async function getAllCategories(): Promise<Category[]> {
  const tools = await getAllTools();
  const categories = new Set<Category>();
  tools.forEach((tool) => categories.add(tool.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique phases from tools
 */
export async function getAllPhases(): Promise<Phase[]> {
  const tools = await getAllTools();
  const phases = new Set<Phase>();
  tools.forEach((tool) => phases.add(tool.phase));
  return Array.from(phases);
}

/**
 * Get tool slugs for static generation
 */
export async function getToolSlugs(): Promise<string[]> {
  const tools = await getAllTools();
  return tools.map((tool) => tool.slug);
}

/**
 * Clear the tools cache (useful for development)
 */
export function clearToolsCache() {
  toolsCache = null;
}
