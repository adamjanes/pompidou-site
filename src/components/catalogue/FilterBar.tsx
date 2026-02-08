'use client';

import { Phase, Category, Status } from '@/types/tool';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  phases: Phase[];
  categories: Category[];
  statuses: Status[];
  search: string;
}

const PHASE_OPTIONS = [
  { value: Phase.SPEC_IT, label: 'Spec It' },
  { value: Phase.TASK_IT, label: 'Task It' },
  { value: Phase.BUILD_IT, label: 'Build It' },
  { value: Phase.VERIFY_IT, label: 'Verify It' },
  { value: Phase.LEARN_IT, label: 'Learn It' },
  { value: Phase.PLATFORM, label: 'Platform' },
];

const CATEGORY_OPTIONS = [
  { value: Category.CONTEXT, label: 'Context' },
  { value: Category.EXECUTION, label: 'Execution' },
  { value: Category.MEMORY, label: 'Memory' },
  { value: Category.MONITORING, label: 'Monitoring' },
  { value: Category.NATIVE, label: 'Native' },
  { value: Category.NOTIFICATION, label: 'Notification' },
  { value: Category.ORCHESTRATION, label: 'Orchestration' },
  { value: Category.PROCESS, label: 'Process' },
  { value: Category.SCHEDULING, label: 'Scheduling' },
  { value: Category.SECURITY, label: 'Security' },
  { value: Category.SPEC, label: 'Spec' },
  { value: Category.TASKS, label: 'Tasks' },
  { value: Category.WORKTREE, label: 'Worktree' },
];

const STATUS_OPTIONS = [
  { value: Status.CHOSEN, label: 'Chosen' },
  { value: Status.CANDIDATE, label: 'Candidate' },
  { value: Status.REJECTED, label: 'Rejected' },
];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse current filters from URL
  const currentPhases = searchParams.get('phases')?.split(',').filter(Boolean) as Phase[] || [];
  const currentCategories = searchParams.get('categories')?.split(',').filter(Boolean) as Category[] || [];
  const currentStatuses = searchParams.get('statuses')?.split(',').filter(Boolean) as Status[] || [];
  const currentSearch = searchParams.get('search') || '';

  const updateURL = useCallback((filters: FilterState) => {
    const params = new URLSearchParams();

    if (filters.phases.length > 0) {
      params.set('phases', filters.phases.join(','));
    }
    if (filters.categories.length > 0) {
      params.set('categories', filters.categories.join(','));
    }
    if (filters.statuses.length > 0) {
      params.set('statuses', filters.statuses.join(','));
    }
    if (filters.search) {
      params.set('search', filters.search);
    }

    const newURL = params.toString() ? `/catalogue?${params.toString()}` : '/catalogue';
    router.push(newURL, { scroll: false });

    onFilterChange?.(filters);
  }, [router, onFilterChange]);

  const toggleFilter = useCallback((type: 'phase' | 'category' | 'status', value: string) => {
    const filters: FilterState = {
      phases: [...currentPhases],
      categories: [...currentCategories],
      statuses: [...currentStatuses],
      search: currentSearch,
    };

    if (type === 'phase') {
      const index = filters.phases.indexOf(value as Phase);
      if (index > -1) {
        filters.phases.splice(index, 1);
      } else {
        filters.phases.push(value as Phase);
      }
    } else if (type === 'category') {
      const index = filters.categories.indexOf(value as Category);
      if (index > -1) {
        filters.categories.splice(index, 1);
      } else {
        filters.categories.push(value as Category);
      }
    } else if (type === 'status') {
      const index = filters.statuses.indexOf(value as Status);
      if (index > -1) {
        filters.statuses.splice(index, 1);
      } else {
        filters.statuses.push(value as Status);
      }
    }

    updateURL(filters);
  }, [currentPhases, currentCategories, currentStatuses, currentSearch, updateURL]);

  const handleSearchChange = useCallback((value: string) => {
    updateURL({
      phases: currentPhases,
      categories: currentCategories,
      statuses: currentStatuses,
      search: value,
    });
  }, [currentPhases, currentCategories, currentStatuses, updateURL]);

  const clearFilters = useCallback(() => {
    router.push('/catalogue');
    onFilterChange?.({
      phases: [],
      categories: [],
      statuses: [],
      search: '',
    });
  }, [router, onFilterChange]);

  const hasActiveFilters = currentPhases.length > 0 || currentCategories.length > 0 || currentStatuses.length > 0 || currentSearch !== '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={currentSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search tools by name or description..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Phase Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Phase</h3>
        <div className="flex flex-wrap gap-2">
          {PHASE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleFilter('phase', option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentPhases.includes(option.value)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleFilter('category', option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentCategories.includes(option.value)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleFilter('status', option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentStatuses.includes(option.value)
                  ? option.value === Status.CHOSEN
                    ? 'bg-green-600 text-white'
                    : option.value === Status.CANDIDATE
                    ? 'bg-yellow-600 text-white'
                    : 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
