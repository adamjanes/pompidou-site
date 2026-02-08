import { Phase, Category, Status } from '@/types';

/**
 * Phase definitions with metadata for display
 */
export const PHASE_DEFINITIONS = {
  [Phase.SPEC_IT]: {
    id: Phase.SPEC_IT,
    label: 'Spec It',
    description: 'Define what to build, surface blockers upfront',
    color: 'blue',
    icon: '📝',
    order: 1,
  },
  [Phase.TASK_IT]: {
    id: Phase.TASK_IT,
    label: 'Task It',
    description: 'Break specs into dependency-aware tasks',
    color: 'purple',
    icon: '🎯',
    order: 2,
  },
  [Phase.BUILD_IT]: {
    id: Phase.BUILD_IT,
    label: 'Build It',
    description: 'Execute with specialized agents, TDD, code review',
    color: 'green',
    icon: '🔨',
    order: 3,
  },
  [Phase.VERIFY_IT]: {
    id: Phase.VERIFY_IT,
    label: 'Verify It',
    description: 'Full CI validation before merge/deploy',
    color: 'orange',
    icon: '✓',
    order: 4,
  },
  [Phase.LEARN_IT]: {
    id: Phase.LEARN_IT,
    label: 'Learn It',
    description: 'Capture session learnings into knowledge base',
    color: 'pink',
    icon: '📚',
    order: 5,
  },
  [Phase.PLATFORM]: {
    id: Phase.PLATFORM,
    label: 'Platform',
    description: 'Infrastructure that keeps the development cycle running 24/7',
    color: 'gray',
    icon: '⚙️',
    order: 6,
  },
} as const;

/**
 * Category definitions with metadata
 */
export const CATEGORY_DEFINITIONS = {
  [Category.CONTEXT]: {
    id: Category.CONTEXT,
    label: 'Context',
    description: 'Tools for gathering and managing code context',
  },
  [Category.EXECUTION]: {
    id: Category.EXECUTION,
    label: 'Execution',
    description: 'Tools for executing code and commands',
  },
  [Category.MEMORY]: {
    id: Category.MEMORY,
    label: 'Memory',
    description: 'Session and project memory management',
  },
  [Category.MONITORING]: {
    id: Category.MONITORING,
    label: 'Monitoring',
    description: 'System monitoring and observability',
  },
  [Category.NATIVE]: {
    id: Category.NATIVE,
    label: 'Native',
    description: 'Platform-native integrations',
  },
  [Category.NOTIFICATION]: {
    id: Category.NOTIFICATION,
    label: 'Notification',
    description: 'Alert and notification systems',
  },
  [Category.ORCHESTRATION]: {
    id: Category.ORCHESTRATION,
    label: 'Orchestration',
    description: 'Multi-agent coordination and workflow',
  },
  [Category.PROCESS]: {
    id: Category.PROCESS,
    label: 'Process',
    description: 'Process and session management',
  },
  [Category.SCHEDULING]: {
    id: Category.SCHEDULING,
    label: 'Scheduling',
    description: 'Task scheduling and automation',
  },
  [Category.SECURITY]: {
    id: Category.SECURITY,
    label: 'Security',
    description: 'Security and safety guards',
  },
  [Category.SPEC]: {
    id: Category.SPEC,
    label: 'Spec',
    description: 'Specification and design tools',
  },
  [Category.TASKS]: {
    id: Category.TASKS,
    label: 'Tasks',
    description: 'Task management and tracking',
  },
  [Category.WORKTREE]: {
    id: Category.WORKTREE,
    label: 'Worktree',
    description: 'Git worktree management',
  },
} as const;

/**
 * Status definitions with metadata
 */
export const STATUS_DEFINITIONS = {
  [Status.CHOSEN]: {
    id: Status.CHOSEN,
    label: 'Chosen',
    description: 'Currently in use',
    color: 'green',
    icon: '✓',
  },
  [Status.CANDIDATE]: {
    id: Status.CANDIDATE,
    label: 'Candidate',
    description: 'Under evaluation',
    color: 'yellow',
    icon: '?',
  },
  [Status.REJECTED]: {
    id: Status.REJECTED,
    label: 'Rejected',
    description: 'Evaluated and declined',
    color: 'red',
    icon: '✗',
  },
} as const;

/**
 * Score thresholds for evaluation
 */
export const SCORE_THRESHOLDS = {
  excellent: 9,
  good: 7,
  fair: 5,
  poor: 3,
} as const;

/**
 * Color mappings for Tailwind classes
 */
export const PHASE_COLORS = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-100',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100',
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    border: 'border-pink-200',
    hover: 'hover:bg-pink-100',
  },
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100',
  },
} as const;

export const STATUS_COLORS = {
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
  },
} as const;
