/**
 * Content loader utilities
 * Loads and processes tool catalogue from source markdown files
 */

import fs from 'fs';
import path from 'path';
import { Tool, ToolMetadata, Phase, Category, Status, ToolFilter, ToolCollection } from '@/types/tool';
import {
  parseMarkdown,
  extractExcerpt,
  parseScores,
  parseArrayField,
} from './markdown-processor';

/**
 * Path to source catalogue
 */
const CATALOGUE_PATH = path.join(
  process.cwd(),
  '../pompidou/catalogue'
);

/**
 * Get all category directories
 */
function getCategoryDirs(): string[] {
  if (!fs.existsSync(CATALOGUE_PATH)) {
    console.warn(`Catalogue path not found: ${CATALOGUE_PATH}`);
    return [];
  }

  return fs
    .readdirSync(CATALOGUE_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * Get all markdown files in a category directory
 */
function getToolFiles(categoryDir: string): string[] {
  const categoryPath = path.join(CATALOGUE_PATH, categoryDir);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  return fs
    .readdirSync(categoryPath)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(categoryPath, file));
}

/**
 * Convert category directory name to Category enum
 */
function toCategoryEnum(dirName: string): Category | null {
  const categoryMap: Record<string, Category> = {
    context: Category.CONTEXT,
    execution: Category.EXECUTION,
    memory: Category.MEMORY,
    monitoring: Category.MONITORING,
    native: Category.NATIVE,
    notification: Category.NOTIFICATION,
    orchestration: Category.ORCHESTRATION,
    process: Category.PROCESS,
    scheduling: Category.SCHEDULING,
    security: Category.SECURITY,
    spec: Category.SPEC,
    tasks: Category.TASKS,
    worktree: Category.WORKTREE,
  };

  return categoryMap[dirName.toLowerCase()] || null;
}

/**
 * Parse tool metadata from frontmatter
 */
function parseToolMetadata(
  frontmatter: any,
  category: Category,
  slug: string
): ToolMetadata {
  // Determine phase from frontmatter or infer from category
  let phase: Phase = frontmatter.phase as Phase;

  if (!phase || phase === Phase.PLATFORM) {
    // Map category to phase as fallback
    const categoryPhaseMap: Partial<Record<Category, Phase>> = {
      [Category.SPEC]: Phase.SPEC_IT,
      [Category.TASKS]: Phase.TASK_IT,
      [Category.EXECUTION]: Phase.BUILD_IT,
    };
    phase = categoryPhaseMap[category] || Phase.PLATFORM;
  }

  return {
    name: frontmatter.name || frontmatter.title || slug,
    slug,
    phase,
    category,
    status: (frontmatter.status as Status) || Status.CANDIDATE,
    tagline: frontmatter.tagline,
    repo: frontmatter.repo,
    docs: frontmatter.docs,
    scores: parseScores(frontmatter),
    pros: parseArrayField(frontmatter.pros),
    cons: parseArrayField(frontmatter.cons),
    alternatives: parseArrayField(frontmatter.alternatives),
    integrationNotes: frontmatter.integrationNotes || frontmatter.integration,
    decision: frontmatter.decision,
    decisionRationale: frontmatter.decisionRationale || frontmatter.rationale,
  };
}

/**
 * Load a single tool from file
 */
function loadTool(filePath: string, category: Category): Tool | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');
    const slug = fileName.toLowerCase().replace(/\s+/g, '-');

    const { frontmatter, content, transformedContent } = parseMarkdown(fileContent);

    const metadata = parseToolMetadata(frontmatter, category, slug);

    return {
      ...metadata,
      content: transformedContent,
      rawContent: content,
      excerpt: extractExcerpt(transformedContent),
    };
  } catch (error) {
    console.error(`Error loading tool from ${filePath}:`, error);
    return null;
  }
}

/**
 * Load all tools from catalogue
 */
export function getAllTools(): Tool[] {
  const tools: Tool[] = [];
  const categoryDirs = getCategoryDirs();

  for (const categoryDir of categoryDirs) {
    const category = toCategoryEnum(categoryDir);
    if (!category) {
      console.warn(`Unknown category directory: ${categoryDir}`);
      continue;
    }

    const toolFiles = getToolFiles(categoryDir);

    for (const toolFile of toolFiles) {
      const tool = loadTool(toolFile, category);
      if (tool) {
        tools.push(tool);
      }
    }
  }

  return tools;
}

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): Tool | null {
  const tools = getAllTools();
  return tools.find(tool => tool.slug === slug) || null;
}

/**
 * Get tools by phase
 */
export function getToolsByPhase(phase: Phase): Tool[] {
  return getAllTools().filter(tool => tool.phase === phase);
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: Category): Tool[] {
  return getAllTools().filter(tool => tool.category === category);
}

/**
 * Get tools by status
 */
export function getToolsByStatus(status: Status): Tool[] {
  return getAllTools().filter(tool => tool.status === status);
}

/**
 * Filter tools by multiple criteria
 */
export function filterTools(filter: ToolFilter): Tool[] {
  let tools = getAllTools();

  // Filter by phase
  if (filter.phase) {
    const phases = Array.isArray(filter.phase) ? filter.phase : [filter.phase];
    tools = tools.filter(tool => phases.includes(tool.phase));
  }

  // Filter by category
  if (filter.category) {
    const categories = Array.isArray(filter.category) ? filter.category : [filter.category];
    tools = tools.filter(tool => categories.includes(tool.category));
  }

  // Filter by status
  if (filter.status) {
    const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
    tools = tools.filter(tool => statuses.includes(tool.status));
  }

  // Filter by search term
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    tools = tools.filter(tool => {
      return (
        tool.name.toLowerCase().includes(searchLower) ||
        tool.tagline?.toLowerCase().includes(searchLower) ||
        tool.content.toLowerCase().includes(searchLower) ||
        tool.category.toLowerCase().includes(searchLower) ||
        tool.phase.toLowerCase().includes(searchLower)
      );
    });
  }

  return tools;
}

/**
 * Get organized tool collection
 */
export function getToolCollection(): ToolCollection {
  const tools = getAllTools();

  const byPhase = Object.values(Phase).reduce((acc, phase) => {
    acc[phase] = tools.filter(tool => tool.phase === phase);
    return acc;
  }, {} as Record<Phase, Tool[]>);

  const byCategory = Object.values(Category).reduce((acc, category) => {
    acc[category] = tools.filter(tool => tool.category === category);
    return acc;
  }, {} as Record<Category, Tool[]>);

  const byStatus = Object.values(Status).reduce((acc, status) => {
    acc[status] = tools.filter(tool => tool.status === status);
    return acc;
  }, {} as Record<Status, Tool[]>);

  return {
    tools,
    byPhase,
    byCategory,
    byStatus,
  };
}

/**
 * Get tool statistics
 */
export function getToolStats() {
  const tools = getAllTools();

  return {
    total: tools.length,
    byPhase: Object.values(Phase).reduce((acc, phase) => {
      acc[phase] = tools.filter(tool => tool.phase === phase).length;
      return acc;
    }, {} as Record<Phase, number>),
    byCategory: Object.values(Category).reduce((acc, category) => {
      acc[category] = tools.filter(tool => tool.category === category).length;
      return acc;
    }, {} as Record<Category, number>),
    byStatus: Object.values(Status).reduce((acc, status) => {
      acc[status] = tools.filter(tool => tool.status === status).length;
      return acc;
    }, {} as Record<Status, number>),
  };
}
