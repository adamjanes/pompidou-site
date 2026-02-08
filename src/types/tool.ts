/**
 * Tool catalogue types for Pompidou site
 */

export enum Phase {
  SPEC_IT = 'spec-it',
  TASK_IT = 'task-it',
  BUILD_IT = 'build-it',
  VERIFY_IT = 'verify-it',
  LEARN_IT = 'learn-it',
  PLATFORM = 'platform',
}

export enum Category {
  CONTEXT = 'context',
  EXECUTION = 'execution',
  MEMORY = 'memory',
  MONITORING = 'monitoring',
  NATIVE = 'native',
  NOTIFICATION = 'notification',
  ORCHESTRATION = 'orchestration',
  PROCESS = 'process',
  SCHEDULING = 'scheduling',
  SECURITY = 'security',
  SPEC = 'spec',
  TASKS = 'tasks',
  WORKTREE = 'worktree',
}

export enum Status {
  CHOSEN = 'CHOSEN',
  CANDIDATE = 'CANDIDATE',
  REJECTED = 'REJECTED',
}

export interface EvaluationScores {
  autonomy?: number;
  reliability?: number;
  integration?: number;
  maintenance?: number;
  overall?: number;
  [key: string]: number | undefined;
}

export interface ToolMetadata {
  name: string;
  slug: string;
  phase: Phase;
  category: Category;
  status: Status;
  tagline?: string;
  repo?: string;
  docs?: string;
  scores?: EvaluationScores;
  pros?: string[];
  cons?: string[];
  alternatives?: string[];
  integrationNotes?: string;
  decision?: string;
  decisionRationale?: string;
  [key: string]: any; // Allow additional frontmatter fields
}

export interface Tool extends ToolMetadata {
  content: string; // Markdown content (transformed)
  rawContent: string; // Original markdown content
  excerpt?: string; // First paragraph or summary
}

export interface ToolCollection {
  tools: Tool[];
  byPhase: Record<Phase, Tool[]>;
  byCategory: Record<Category, Tool[]>;
  byStatus: Record<Status, Tool[]>;
}

export type ToolFilter = {
  phase?: Phase | Phase[];
  category?: Category | Category[];
  status?: Status | Status[];
  search?: string;
};
