/**
 * Tool Detail Component
 * Full detail view for individual tool evaluation
 */

import Link from 'next/link';
import { Tool, Phase, Category, Status } from '@/types/tool';
import EvaluationScore from './EvaluationScore';

interface ToolDetailProps {
  tool: Tool;
}

function PhaseBadge({ phase }: { phase: Phase }) {
  const phaseColors: Record<Phase, string> = {
    [Phase.SPEC_IT]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    [Phase.TASK_IT]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    [Phase.BUILD_IT]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    [Phase.VERIFY_IT]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    [Phase.LEARN_IT]: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    [Phase.PLATFORM]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  const phaseLabels: Record<Phase, string> = {
    [Phase.SPEC_IT]: 'Spec It',
    [Phase.TASK_IT]: 'Task It',
    [Phase.BUILD_IT]: 'Build It',
    [Phase.VERIFY_IT]: 'Verify It',
    [Phase.LEARN_IT]: 'Learn It',
    [Phase.PLATFORM]: 'Platform',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${phaseColors[phase]}`}>
      {phaseLabels[phase]}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const statusColors: Record<Status, string> = {
    [Status.CHOSEN]: 'bg-green-600 text-white dark:bg-green-700',
    [Status.CANDIDATE]: 'bg-blue-600 text-white dark:bg-blue-700',
    [Status.REJECTED]: 'bg-red-600 text-white dark:bg-red-700',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${statusColors[status]}`}>
      {status}
    </span>
  );
}

function CategoryBadge({ category }: { category: Category }) {
  const categoryLabels: Record<Category, string> = {
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

  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
      {categoryLabels[category]}
    </span>
  );
}

export default function ToolDetail({ tool }: ToolDetailProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href="/catalogue"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Catalogue
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <PhaseBadge phase={tool.phase} />
          <CategoryBadge category={tool.category} />
          <StatusBadge status={tool.status} />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {tool.name}
        </h1>

        {tool.tagline && (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {tool.tagline}
          </p>
        )}

        {/* Links */}
        {(tool.repo || tool.docs) && (
          <div className="flex flex-wrap gap-4 mt-4">
            {tool.repo && (
              <a
                href={tool.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Repository
              </a>
            )}
            {tool.docs && (
              <a
                href={tool.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Documentation
              </a>
            )}
          </div>
        )}
      </header>

      {/* Evaluation Score */}
      {tool.scores && Object.keys(tool.scores).length > 0 && (
        <section className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Evaluation
          </h2>

          {/* Display all available scores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(tool.scores).map(([key, value]) => {
              if (value === undefined) return null;

              // Format the key: "holy grail alignment" -> "Holy Grail Alignment"
              const formatKey = (k: string) => k.split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');

              return (
                <div key={key} className="space-y-1">
                  <EvaluationScore
                    score={value}
                    label={formatKey(key)}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Pros */}
      {tool.pros && tool.pros.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Pros
          </h2>
          <ul className="space-y-2">
            {tool.pros.map((pro, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{pro}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Cons */}
      {tool.cons && tool.cons.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Cons
          </h2>
          <ul className="space-y-2">
            {tool.cons.map((con, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{con}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Integration Notes */}
      {tool.integrationNotes && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Integration Notes
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {tool.integrationNotes}
            </p>
          </div>
        </section>
      )}

      {/* Decision & Rationale */}
      {(tool.decision || tool.decisionRationale) && (
        <section className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
          {tool.decision && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Decision
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {tool.decision}
              </p>
            </>
          )}
          {tool.decisionRationale && (
            <>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Rationale
              </h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {tool.decisionRationale}
              </p>
            </>
          )}
        </section>
      )}

      {/* Alternatives */}
      {tool.alternatives && tool.alternatives.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Alternatives
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {tool.alternatives.map((alt, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {alt}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Full content */}
      {tool.content && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Full Evaluation
          </h2>
          <div
            className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400"
            dangerouslySetInnerHTML={{ __html: tool.content }}
          />
        </section>
      )}
    </div>
  );
}
