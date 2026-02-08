import { Tool, Phase, Status, Category } from '@/types/tool';

export interface FilterState {
  phase?: Phase;
  status?: Status;
  category?: Category;
  searchQuery?: string;
}

/**
 * Filter tools based on multiple criteria using AND logic
 */
export function filterTools(tools: Tool[], filters: FilterState): Tool[] {
  let filtered = tools;

  // Filter by phase
  if (filters.phase) {
    filtered = filtered.filter((tool) => tool.phase === filters.phase);
  }

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter((tool) => tool.status === filters.status);
  }

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter((tool) => tool.category === filters.category);
  }

  // Filter by search query
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const query = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter((tool) => {
      const nameMatch = tool.name.toLowerCase().includes(query);
      const categoryMatch = tool.category.toLowerCase().includes(query);
      const descriptionMatch = tool.tagline?.toLowerCase().includes(query) ?? false;
      const contentMatch = tool.content.toLowerCase().includes(query);

      return nameMatch || categoryMatch || descriptionMatch || contentMatch;
    });
  }

  return filtered;
}

/**
 * Get unique values for filter options
 */
export function getFilterOptions(tools: Tool[]) {
  const phases = Array.from(new Set(tools.map((t) => t.phase))).sort();
  const statuses = Array.from(new Set(tools.map((t) => t.status))).sort();
  const categories = Array.from(new Set(tools.map((t) => t.category))).sort();

  return {
    phases,
    statuses,
    categories,
  };
}

/**
 * Count tools by filter criteria
 */
export function getFilterCounts(tools: Tool[]) {
  const byPhase: Record<Phase, number> = {} as Record<Phase, number>;
  const byStatus: Record<Status, number> = {} as Record<Status, number>;
  const byCategory: Record<Category, number> = {} as Record<Category, number>;

  tools.forEach((tool) => {
    byPhase[tool.phase] = (byPhase[tool.phase] || 0) + 1;
    byStatus[tool.status] = (byStatus[tool.status] || 0) + 1;
    byCategory[tool.category] = (byCategory[tool.category] || 0) + 1;
  });

  return {
    byPhase,
    byStatus,
    byCategory,
  };
}
