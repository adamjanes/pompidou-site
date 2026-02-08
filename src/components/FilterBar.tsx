/**
 * Filter Bar Component
 * Provides filtering controls for the tool catalogue
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Phase, Category, Status } from '@/types/tool';

interface FilterBarProps {
  totalTools: number;
  filteredCount: number;
  availableCategories: Category[];
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

export default function FilterBar({
  totalTools,
  filteredCount,
  availableCategories,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPhase = searchParams.get('phase') || 'all';
  const currentStatus = searchParams.get('status') || 'all';
  const currentCategory = searchParams.get('category') || 'all';

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const queryString = params.toString();
      router.push(queryString ? `/catalogue?${queryString}` : '/catalogue');
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push('/catalogue');
  }, [router]);

  const hasActiveFilters = useMemo(() => {
    return currentPhase !== 'all' || currentStatus !== 'all' || currentCategory !== 'all';
  }, [currentPhase, currentStatus, currentCategory]);

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Phase Filter */}
        <div>
          <label
            htmlFor="phase-filter"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Phase
          </label>
          <select
            id="phase-filter"
            value={currentPhase}
            onChange={e => updateFilter('phase', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Phases</option>
            {Object.values(Phase).map(phase => (
              <option key={phase} value={phase}>
                {getPhaseLabel(phase)}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label
            htmlFor="status-filter"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <select
            id="status-filter"
            value={currentStatus}
            onChange={e => updateFilter('status', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Statuses</option>
            {Object.values(Status).map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label
            htmlFor="category-filter"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category-filter"
            value={currentCategory}
            onChange={e => updateFilter('category', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Categories</option>
            {availableCategories.map(category => (
              <option key={category} value={category}>
                {getCategoryLabel(category)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count and Clear Filters */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {filteredCount}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalTools}
          </span>{' '}
          tools
        </p>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
