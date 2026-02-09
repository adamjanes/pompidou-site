import { Suspense } from 'react';
import FilterBar from '@/components/catalogue/FilterBar';
import ToolGrid from '@/components/catalogue/ToolGrid';
import { getAllTools } from '@/lib/catalogue';
import { Phase, Category, Status } from '@/types/tool';

export const metadata = {
  title: 'Tool Catalogue | Pompidou',
  description: 'Browse and filter the complete catalogue of tools for building autonomous AI development systems.',
};

type SearchParams = Promise<{
  phases?: string;
  categories?: string;
  statuses?: string;
  search?: string;
}>;

export default async function CataloguePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const allTools = await getAllTools();

  // Parse filters from URL
  const phases = params.phases?.split(',').filter(Boolean) as Phase[] || [];
  const categories = params.categories?.split(',').filter(Boolean) as Category[] || [];
  const statuses = params.statuses?.split(',').filter(Boolean) as Status[] || [];
  const searchQuery = params.search || '';

  // Filter tools server-side
  let filteredTools = allTools.filter((tool) => {
    // Phase filter
    if (phases.length > 0 && !phases.includes(tool.phase)) {
      return false;
    }

    // Category filter
    if (categories.length > 0 && !categories.includes(tool.category)) {
      return false;
    }

    // Status filter
    if (statuses.length > 0 && !statuses.includes(tool.status)) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tool Catalogue
          </h1>
          <p className="text-xl text-gray-600">
            Browse and compare 130+ tools for autonomous AI development.
            Filter by phase, category, or status to find the right tools for your system.
          </p>
        </div>

        {/* Filter Bar */}
        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterBar />
        </Suspense>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredTools.length}</span>
            {' '}
            {filteredTools.length === 1 ? 'tool' : 'tools'} found
          </p>
        </div>

        {/* Tool Grid */}
        <ToolGrid tools={filteredTools} />
      </div>
    </div>
  );
}
