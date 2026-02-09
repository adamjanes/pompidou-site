'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterBar, { FilterState } from '@/components/catalogue/FilterBar';
import ToolGrid from '@/components/catalogue/ToolGrid';
import { Tool, Phase, Category, Status } from '@/types/tool';

interface CatalogueClientProps {
  tools: Tool[];
}

export default function CatalogueClient({ tools: initialTools }: CatalogueClientProps) {
  const searchParams = useSearchParams();
  const [tools] = useState<Tool[]>(initialTools);
  const [isLoading] = useState(false);

  console.log('[CatalogueClient] Received tools:', initialTools?.length || 0);

  // Parse filters from URL
  const filters = useMemo((): FilterState => {
    const phases = searchParams.get('phases')?.split(',').filter(Boolean) as Phase[] || [];
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) as Category[] || [];
    const statuses = searchParams.get('statuses')?.split(',').filter(Boolean) as Status[] || [];
    const search = searchParams.get('search') || '';

    return { phases, categories, statuses, search };
  }, [searchParams]);

  // Filter tools based on current filters
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Phase filter
      if (filters.phases.length > 0 && !filters.phases.includes(tool.phase)) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(tool.category)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(tool.status)) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch = tool.name.toLowerCase().includes(searchLower);
        const excerptMatch = tool.excerpt?.toLowerCase().includes(searchLower) || false;
        const taglineMatch = tool.tagline?.toLowerCase().includes(searchLower) || false;
        const contentMatch = tool.content.toLowerCase().includes(searchLower);

        if (!nameMatch && !excerptMatch && !taglineMatch && !contentMatch) {
          return false;
        }
      }

      return true;
    });
  }, [tools, filters]);

  return (
    <>
      {/* Filter Bar */}
      <FilterBar />

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">{filteredTools.length}</span>
          {' '}
          {filteredTools.length === 1 ? 'tool' : 'tools'} found
        </p>
      </div>

      {/* Tool Grid */}
      <ToolGrid tools={filteredTools} isLoading={isLoading} />
    </>
  );
}
