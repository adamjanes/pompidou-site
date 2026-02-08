/**
 * Tool Detail Page
 * Dynamic route for individual tool evaluation pages
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTools, getToolBySlug } from '@/lib/content-loader';
import ToolDetail from '@/components/ToolDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all tools
 */
export async function generateStaticParams() {
  const tools = getAllTools();

  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | Pompidou',
    };
  }

  const description = tool.tagline || tool.excerpt || `Evaluation of ${tool.name}`;

  return {
    title: `${tool.name} | Pompidou Catalogue`,
    description,
    openGraph: {
      title: tool.name,
      description,
      type: 'article',
    },
  };
}

/**
 * Tool detail page
 */
export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolDetail tool={tool} />;
}
