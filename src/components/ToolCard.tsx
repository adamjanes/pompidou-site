/**
 * Tool Card Component
 * Displays a single tool in the catalogue grid
 */

import Link from 'next/link';
import { Tool, Status } from '@/types/tool';

interface ToolCardProps {
  tool: Tool;
}

function getPhaseLabel(phase: string): string {
  const labels: Record<string, string> = {
    'spec-it': 'Spec It',
    'task-it': 'Task It',
    'build-it': 'Build It',
    'verify-it': 'Verify It',
    'learn-it': 'Learn It',
    'platform': 'Platform',
  };
  return labels[phase] || phase;
}

function getCategoryLabel(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getStatusColor(status: Status): string {
  switch (status) {
    case Status.CHOSEN:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case Status.CANDIDATE:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case Status.REJECTED:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
}

function getPhaseColor(phase: string): string {
  const colors: Record<string, string> = {
    'spec-it': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'task-it': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'build-it': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'verify-it': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    'learn-it': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'platform': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
  };
  return colors[phase] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
}

export default function ToolCard({ tool }: ToolCardProps) {
  const showScore =
    (tool.status === Status.CHOSEN || tool.status === Status.CANDIDATE) &&
    tool.scores?.overall !== undefined;

  return (
    <Link
      href={`/catalogue/${tool.slug}`}
      className="block h-full transition-all duration-200 hover:scale-105"
    >
      <div className="h-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {tool.name}
          </h3>
          {showScore && (
            <div className="flex-shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {tool.scores!.overall!.toFixed(1)}
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          {getCategoryLabel(tool.category)}
        </div>

        {/* Description */}
        {tool.tagline && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
            {tool.tagline}
          </p>
        )}
        {!tool.tagline && tool.excerpt && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
            {tool.excerpt}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPhaseColor(
              tool.phase
            )}`}
          >
            {getPhaseLabel(tool.phase)}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
              tool.status
            )}`}
          >
            {tool.status}
          </span>
        </div>
      </div>
    </Link>
  );
}
