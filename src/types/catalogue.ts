import { Phase, Category, Status, Tool } from './tool';

/**
 * Catalogue filtering and search types
 */

export interface CatalogueFilter {
  phase?: Phase | Phase[];
  category?: Category | Category[];
  status?: Status | Status[];
  search?: string;
}

export interface SearchResult {
  tool: Tool;
  score: number;
  matchedFields: string[];
}

export interface CatalogueStats {
  totalTools: number;
  byPhase: Record<Phase, number>;
  byCategory: Record<Category, number>;
  byStatus: Record<Status, number>;
  averageScores: {
    autonomy: number;
    reliability: number;
    integration: number;
    maintenance: number;
    overall: number;
  };
}

export interface ToolComparison {
  tools: Tool[];
  categories: string[];
  scores: Record<string, Record<string, number>>;
}
