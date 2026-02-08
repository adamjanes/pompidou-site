import { Suspense } from 'react';
import CatalogueClient from './CatalogueClient';
import { getAllTools } from '@/lib/catalogue';

export const metadata = {
  title: 'Tool Catalogue | Pompidou',
  description: 'Browse and filter the complete catalogue of tools for building autonomous AI development systems.',
};

export default async function CataloguePage() {
  const tools = await getAllTools();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tool Catalogue
          </h1>
          <p className="text-xl text-gray-600">
            Browse and compare 80+ tools for autonomous AI development.
            Filter by phase, category, or status to find the right tools for your system.
          </p>
        </div>

        {/* Suspense wrapper for client component with search params */}
        <Suspense fallback={<div>Loading filters...</div>}>
          <CatalogueClient tools={tools} />
        </Suspense>
      </div>
    </div>
  );
}
