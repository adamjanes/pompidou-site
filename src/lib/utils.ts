import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Phase, Status } from '@/types';
import {
  PHASE_DEFINITIONS,
  STATUS_DEFINITIONS,
  SCORE_THRESHOLDS,
  PHASE_COLORS,
  STATUS_COLORS,
} from './constants';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a score for display (0-10 scale)
 */
export function formatScore(score: number | undefined): string {
  if (score === undefined) return 'N/A';
  return score.toFixed(1);
}

/**
 * Get score quality label based on thresholds
 */
export function getScoreQuality(score: number | undefined): string {
  if (score === undefined) return 'unknown';
  if (score >= SCORE_THRESHOLDS.excellent) return 'excellent';
  if (score >= SCORE_THRESHOLDS.good) return 'good';
  if (score >= SCORE_THRESHOLDS.fair) return 'fair';
  return 'poor';
}

/**
 * Convert text to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get color classes for a phase
 */
export function getPhaseColor(phase: Phase) {
  const definition = PHASE_DEFINITIONS[phase];
  return PHASE_COLORS[definition.color as keyof typeof PHASE_COLORS];
}

/**
 * Get color classes for a status
 */
export function getStatusColor(status: Status) {
  const definition = STATUS_DEFINITIONS[status];
  return STATUS_COLORS[definition.color as keyof typeof STATUS_COLORS];
}

/**
 * Get phase definition by ID
 */
export function getPhaseDefinition(phase: Phase) {
  return PHASE_DEFINITIONS[phase];
}

/**
 * Get status definition by ID
 */
export function getStatusDefinition(status: Status) {
  return STATUS_DEFINITIONS[status];
}

/**
 * Sort phases by their defined order
 */
export function sortPhases(phases: Phase[]): Phase[] {
  return [...phases].sort(
    (a, b) => PHASE_DEFINITIONS[a].order - PHASE_DEFINITIONS[b].order
  );
}

/**
 * Extract excerpt from markdown content (first paragraph)
 */
export function extractExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown formatting
  const text = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove code
    .trim();

  // Get first paragraph
  const firstParagraph = text.split('\n\n')[0];

  // Truncate if needed
  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }

  return firstParagraph.slice(0, maxLength).trim() + '...';
}

/**
 * Calculate average of an array of scores
 */
export function calculateAverageScore(scores: (number | undefined)[]): number {
  const validScores = scores.filter((s): s is number => s !== undefined);
  if (validScores.length === 0) return 0;
  return validScores.reduce((sum, s) => sum + s, 0) / validScores.length;
}

/**
 * Format a list of items with proper grammar
 */
export function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
