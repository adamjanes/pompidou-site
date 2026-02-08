import { Tool } from '@/types/tool';

interface ScoredTool extends Tool {
  searchScore: number;
}

/**
 * Search tools with full-text matching and relevance scoring
 */
export function searchTools(tools: Tool[], query: string): Tool[] {
  if (!query || query.trim() === '') {
    return tools;
  }

  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);

  // Score each tool
  const scoredTools: ScoredTool[] = tools
    .map((tool) => {
      const score = calculateRelevanceScore(tool, normalizedQuery, queryTerms);
      return {
        ...tool,
        searchScore: score,
      };
    })
    .filter((tool) => tool.searchScore > 0);

  // Sort by relevance score (descending)
  scoredTools.sort((a, b) => b.searchScore - a.searchScore);

  // Remove score property before returning
  return scoredTools.map(({ searchScore, ...tool }) => tool);
}

/**
 * Calculate relevance score for a tool based on query
 */
function calculateRelevanceScore(
  tool: Tool,
  query: string,
  queryTerms: string[]
): number {
  let score = 0;

  const name = tool.name.toLowerCase();
  const category = tool.category.toLowerCase();
  const tagline = (tool.tagline || '').toLowerCase();
  const content = tool.content.toLowerCase();
  const pros = (tool.pros || []).join(' ').toLowerCase();
  const cons = (tool.cons || []).join(' ').toLowerCase();

  // Exact name match: highest weight
  if (name === query) {
    score += 100;
  } else if (name.includes(query)) {
    score += 50;
  }

  // Name contains individual terms
  queryTerms.forEach((term) => {
    if (name.includes(term)) {
      score += 20;
    }
  });

  // Category match: high weight
  if (category === query) {
    score += 30;
  } else if (category.includes(query)) {
    score += 15;
  }

  queryTerms.forEach((term) => {
    if (category.includes(term)) {
      score += 10;
    }
  });

  // Tagline match: medium weight
  if (tagline.includes(query)) {
    score += 20;
  }

  queryTerms.forEach((term) => {
    if (tagline.includes(term)) {
      score += 8;
    }
  });

  // Pros/cons match: medium-low weight
  if (pros.includes(query)) {
    score += 10;
  }

  if (cons.includes(query)) {
    score += 10;
  }

  queryTerms.forEach((term) => {
    if (pros.includes(term)) {
      score += 5;
    }
    if (cons.includes(term)) {
      score += 5;
    }
  });

  // Content match: lowest weight (but still relevant)
  if (content.includes(query)) {
    score += 5;
  }

  queryTerms.forEach((term) => {
    if (content.includes(term)) {
      score += 2;
    }
  });

  return score;
}

/**
 * Highlight matching terms in text
 */
export function highlightMatches(text: string, query: string): string {
  if (!query || query.trim() === '') {
    return text;
  }

  const terms = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  let result = text;

  terms.forEach((term) => {
    // Case-insensitive replacement with highlighting
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });

  return result;
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extract search excerpt from content
 */
export function extractSearchExcerpt(
  content: string,
  query: string,
  maxLength = 200
): string {
  if (!query || query.trim() === '') {
    return content.substring(0, maxLength);
  }

  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Find first occurrence of query
  const index = lowerContent.indexOf(lowerQuery);

  if (index === -1) {
    // Query not found, return beginning
    return content.substring(0, maxLength);
  }

  // Extract surrounding context
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + maxLength - 50);

  let excerpt = content.substring(start, end);

  // Add ellipsis if truncated
  if (start > 0) {
    excerpt = '...' + excerpt;
  }
  if (end < content.length) {
    excerpt = excerpt + '...';
  }

  return excerpt;
}
