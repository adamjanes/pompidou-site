import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the methodology behind the Pompidou catalogue and how tools are evaluated for autonomous AI development systems.',
};

const evaluationCriteria = [
  {
    name: 'Integration',
    description: 'How easily the tool integrates with existing workflows and other tools in the stack.',
    aspects: [
      'API quality and documentation',
      'Configuration complexity',
      'Compatibility with existing tools',
      'Setup time and learning curve',
    ],
  },
  {
    name: 'Reliability',
    description: 'How dependable and stable the tool is in production environments.',
    aspects: [
      'Uptime and availability',
      'Error handling and recovery',
      'Performance consistency',
      'Maintenance and support',
    ],
  },
  {
    name: 'Usability',
    description: 'How intuitive and developer-friendly the tool is to work with.',
    aspects: [
      'CLI and UI design',
      'Developer experience',
      'Documentation quality',
      'Community and ecosystem',
    ],
  },
];

const scoringSystem = [
  {
    score: '9-10',
    label: 'Exceptional',
    description: 'Best-in-class tool with minimal friction, excellent documentation, and proven reliability.',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    score: '7-8',
    label: 'Strong',
    description: 'Solid tool with good integration, reliable performance, and adequate documentation.',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    score: '5-6',
    label: 'Adequate',
    description: 'Functional tool with some rough edges or integration challenges.',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    score: '3-4',
    label: 'Weak',
    description: 'Tool with significant limitations, integration issues, or reliability concerns.',
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    score: '1-2',
    label: 'Poor',
    description: 'Tool not recommended due to major issues with integration, reliability, or usability.',
    color: 'text-red-600 dark:text-red-400',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            About the Catalogue
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-8">
            A comprehensive evaluation of tools for building autonomous AI development systems,
            grounded in practical experience and rigorous assessment.
          </p>
        </div>

        {/* Methodology Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Methodology
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Each tool in this catalogue has been evaluated through hands-on integration and real-world usage
              within an autonomous development system. The evaluations are not based on marketing materials or
              theoretical capabilities—they reflect actual experience deploying and operating these tools.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Tools are assessed across multiple dimensions and scored on a 10-point scale. The evaluation
              considers not just individual tool quality, but how well each fits within the broader Holy Grail
              framework and integrates with the rest of the stack.
            </p>
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
            Evaluation Criteria
          </h2>
          <div className="space-y-8">
            {evaluationCriteria.map((criterion) => (
              <div
                key={criterion.name}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {criterion.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {criterion.description}
                </p>
                <ul className="space-y-2">
                  {criterion.aspects.map((aspect) => (
                    <li key={aspect} className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{aspect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring System */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
            Scoring System
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Each tool receives a numerical score from 1-10 across each evaluation dimension.
            Scores are weighted based on the tool's role and the specific requirements of autonomous development.
          </p>
          <div className="space-y-4">
            {scoringSystem.map((tier) => (
              <div
                key={tier.score}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className={`text-2xl font-bold ${tier.color} min-w-[4rem]`}>
                    {tier.score}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {tier.label}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tier.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Holy Grail Framework */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            The Holy Grail Framework
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Tools are organized according to the five-phase development workflow that forms the foundation
              of autonomous AI development:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Spec It:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    Define what to build, surface blockers upfront
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Task It:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    Break specs into dependency-aware tasks
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Build It:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    Execute with multi-agent coordination
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Verify It:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    Full CI validation before merge
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Learn It:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    Capture session learnings into documentation
                  </span>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              In addition to these five phases, the framework includes Platform Infrastructure—the supporting
              systems that keep development running continuously, including scheduling, process management,
              resilience, and monitoring.
            </p>
          </div>
        </section>

        {/* Tool Status */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Tool Status
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Each tool in the catalogue is marked with one of three statuses:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 dark:bg-green-900/20 px-3 py-1 text-sm font-medium text-green-700 dark:text-green-400 whitespace-nowrap">
                  CHOSEN
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Currently deployed and actively used in the system. These tools have proven themselves
                  through production usage.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-400 whitespace-nowrap">
                  CANDIDATE
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Under evaluation or consideration. Strong potential but not yet integrated, or viable
                  alternative to current choice.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-100 dark:bg-red-900/20 px-3 py-1 text-sm font-medium text-red-700 dark:text-red-400 whitespace-nowrap">
                  REJECTED
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Evaluated and found unsuitable. Documentation includes specific reasons why the tool
                  didn't meet requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to explore the tools?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Browse the complete catalogue to find the tools that fit your autonomous development needs.
            Each entry includes detailed evaluation scores, integration notes, and practical insights.
          </p>
          <Link
            href="/catalogue"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            Explore the Catalogue
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
