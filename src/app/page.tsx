import Link from 'next/link';

const phases = [
  {
    number: 1,
    title: 'Spec It',
    description: 'Define what to build, surface blockers upfront',
    icon: '📋',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500',
  },
  {
    number: 2,
    title: 'Task It',
    description: 'Break specs into dependency-aware tasks',
    icon: '🎯',
    color: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500',
  },
  {
    number: 3,
    title: 'Build It',
    description: 'Execute with multi-agent coordination',
    icon: '⚡',
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500',
  },
  {
    number: 4,
    title: 'Verify It',
    description: 'Full CI validation before merge',
    icon: '✓',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500',
  },
  {
    number: 5,
    title: 'Learn It',
    description: 'Capture session learnings into documentation',
    icon: '📚',
    color: 'from-red-500 to-rose-500',
    borderColor: 'border-red-500',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              <span className="block">The Holy Grail of</span>
              <span className="block gradient-text">Autonomous AI Development</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              A comprehensive catalogue of 80+ evaluated tools for building autonomous AI development systems.
              From specification to deployment, discover the tools that power modern AI-assisted workflows.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/catalogue"
                className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Explore the Catalogue
              </Link>
              <Link
                href="/about"
                className="text-base font-semibold leading-7 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Five Phases Section */}
      <section className="py-20 sm:py-24 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              The Five Phases
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              A complete framework for autonomous development workflows
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b ${phase.color}`} />
                <div className="flex items-start gap-4">
                  <div className="text-4xl" aria-hidden="true">
                    {phase.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {phase.number}. {phase.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Platform Infrastructure Card */}
            <div className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl" aria-hidden="true">
                  🏗️
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Platform Infrastructure
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Supporting systems that keep development running 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8">
              About This Catalogue
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                This site presents a comprehensive evaluation of tools for building autonomous AI development systems.
                Each tool has been assessed across multiple dimensions including integration complexity,
                ecosystem maturity, performance characteristics, and fit within the Holy Grail framework.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Whether you're building your first AI-assisted workflow or scaling an enterprise autonomous development
                platform, this catalogue provides the insights you need to make informed tool choices.
              </p>
              <div className="bg-white dark:bg-gray-950 rounded-lg p-6 border border-gray-200 dark:border-gray-800 my-8">
                <p className="text-base italic text-gray-600 dark:text-gray-400">
                  "The goal isn't to replace developers—it's to amplify their capabilities. With the right tools
                  orchestrated correctly, a single developer can ship with the velocity of an entire team."
                </p>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Navigate to the <Link href="/catalogue" className="text-blue-600 dark:text-blue-400 hover:underline">catalogue</Link> to explore tools by phase, category,
                or search for specific capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
