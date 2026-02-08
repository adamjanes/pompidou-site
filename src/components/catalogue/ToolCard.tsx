import Link from 'next/link';
import { Tool, Status, Phase, Category } from '@/types/tool';

interface ToolCardProps {
  tool: Tool;
}

const PHASE_LABELS: Record<Phase, string> = {
  [Phase.SPEC_IT]: 'Spec It',
  [Phase.TASK_IT]: 'Task It',
  [Phase.BUILD_IT]: 'Build It',
  [Phase.VERIFY_IT]: 'Verify It',
  [Phase.LEARN_IT]: 'Learn It',
  [Phase.PLATFORM]: 'Platform',
};

const CATEGORY_LABELS: Record<Category, string> = {
  [Category.CONTEXT]: 'Context',
  [Category.EXECUTION]: 'Execution',
  [Category.MEMORY]: 'Memory',
  [Category.MONITORING]: 'Monitoring',
  [Category.NATIVE]: 'Native',
  [Category.NOTIFICATION]: 'Notification',
  [Category.ORCHESTRATION]: 'Orchestration',
  [Category.PROCESS]: 'Process',
  [Category.SCHEDULING]: 'Scheduling',
  [Category.SECURITY]: 'Security',
  [Category.SPEC]: 'Spec',
  [Category.TASKS]: 'Tasks',
  [Category.WORKTREE]: 'Worktree',
};

const PHASE_COLORS: Record<Phase, string> = {
  [Phase.SPEC_IT]: 'bg-blue-100 text-blue-800',
  [Phase.TASK_IT]: 'bg-purple-100 text-purple-800',
  [Phase.BUILD_IT]: 'bg-green-100 text-green-800',
  [Phase.VERIFY_IT]: 'bg-orange-100 text-orange-800',
  [Phase.LEARN_IT]: 'bg-pink-100 text-pink-800',
  [Phase.PLATFORM]: 'bg-gray-100 text-gray-800',
};

const STATUS_COLORS: Record<Status, string> = {
  [Status.CHOSEN]: 'bg-green-50 border-green-500',
  [Status.CANDIDATE]: 'bg-yellow-50 border-yellow-500',
  [Status.REJECTED]: 'bg-red-50 border-red-500',
};

const STATUS_BADGES: Record<Status, string> = {
  [Status.CHOSEN]: 'bg-green-500 text-white',
  [Status.CANDIDATE]: 'bg-yellow-500 text-white',
  [Status.REJECTED]: 'bg-red-500 text-white',
};

export default function ToolCard({ tool }: ToolCardProps) {
  const excerpt = tool.excerpt || tool.tagline || 'No description available';
  const truncatedExcerpt = excerpt.length > 150 ? excerpt.substring(0, 150) + '...' : excerpt;

  // Calculate average score from all available scores
  const calculateAverageScore = (scores: Record<string, number | undefined> | undefined): number | undefined => {
    if (!scores) return undefined;
    const values = Object.values(scores).filter((v): v is number => v !== undefined);
    if (values.length === 0) return undefined;
    return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
  };

  const overallScore = calculateAverageScore(tool.scores);

  return (
    <Link
      href={`/catalogue/${tool.slug}`}
      className={`block border-2 rounded-lg p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${STATUS_COLORS[tool.status]}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-bold text-gray-900 flex-1">{tool.name}</h3>
        <span className={`px-2 py-1 text-xs font-semibold rounded ${STATUS_BADGES[tool.status]}`}>
          {tool.status}
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${PHASE_COLORS[tool.phase]}`}>
          {PHASE_LABELS[tool.phase]}
        </span>
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-700">
          {CATEGORY_LABELS[tool.category]}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {truncatedExcerpt}
      </p>

      {/* Score */}
      {overallScore !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Score:</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < overallScore ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm font-semibold text-gray-700 ml-1">{overallScore}/5</span>
          </div>
        </div>
      )}

      {/* Link indicator */}
      <div className="mt-4 text-sm font-medium text-blue-600 flex items-center gap-1">
        View details
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
