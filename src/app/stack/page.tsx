import Link from 'next/link';

interface Tool {
  name: string;
  score: number | null;
  stars: number | null;
  description: string;
  status: string;
  install: string | null;
  why: string | null;
}

interface StackSection {
  title: string;
  subtitle: string;
  icon: string;
  tools: Tool[];
}

const stackTools: Record<string, StackSection> = {
  phase1: {
    title: 'Phase 1: Spec It',
    subtitle: 'Define what to build, surface blockers upfront',
    icon: '📋',
    tools: [
      {
        name: 'OpenSpec',
        score: 4.75,
        stars: 22700,
        description: 'Brownfield specs — interactive CLI that surfaces blockers upfront and generates actionable specifications.',
        status: 'Installed globally',
        install: 'npm install -g @fission-ai/openspec@latest',
        why: 'Highest-rated spec tool. Production-ready with active community. Handles complex brownfield refactoring scenarios.',
      },
    ],
  },
  phase2: {
    title: 'Phase 2: Task It',
    subtitle: 'Break specs into dependency-aware tasks',
    icon: '🎯',
    tools: [
      {
        name: 'Beads',
        score: 4.65,
        stars: 15104,
        description: 'Git-native task management with dependency tracking. Each task is a git note attached to commits.',
        status: 'Planned',
        install: 'brew install steveyegge/beads/bd',
        why: 'Lightweight, git-native, no external dependencies. Built by Google engineer. Perfect for autonomous workflows.',
      },
      {
        name: '/pour (DIY)',
        score: null,
        stars: null,
        description: 'Custom slash command to bridge OpenSpec tasks.md to Beads (reads tasks, runs bd add + bd dep).',
        status: 'To build',
        install: null,
        why: 'Automates the spec-to-tasks transition. One command to import all tasks with dependencies.',
      },
    ],
  },
  phase3: {
    title: 'Phase 3: Build It',
    subtitle: 'Execute with multi-agent coordination',
    icon: '⚡',
    tools: [
      {
        name: 'Oh-My-ClaudeCode',
        score: 3.48,
        stars: 4844,
        description: 'Thin wrapper for autopilot, ralph, and ultrapilot execution modes. 32 specialized agents with model routing.',
        status: 'Installed',
        install: 'Marketplace plugin',
        why: 'Interim solution while Native Agent Teams matures. Use as execution wrapper only — don\'t invest in full OMC abstraction set.',
      },
      {
        name: 'Native Agent Teams',
        score: 4.0,
        stars: null,
        description: 'Built-in Claude Code multi-agent coordination. Long-term replacement for OMC once model routing ships.',
        status: 'Enabled',
        install: 'export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1',
        why: 'First-party, zero dependencies, tightly integrated. Migration trigger: when model routing lands.',
      },
    ],
  },
  phase4: {
    title: 'Phase 4: Verify It',
    subtitle: 'Full CI validation before merge',
    icon: '✓',
    tools: [
      {
        name: 'Per-project verify.sh',
        score: null,
        stars: null,
        description: 'Shell script that runs lint, typecheck, test, and build. Blocks merge if any step fails.',
        status: 'To build',
        install: null,
        why: 'Simple, explicit, no magic. Templates available for Next.js, Vite, and monorepos.',
      },
    ],
  },
  phase5: {
    title: 'Phase 5: Learn It',
    subtitle: 'Capture session learnings into documentation',
    icon: '📚',
    tools: [
      {
        name: '/harvest (DIY)',
        score: null,
        stars: null,
        description: 'Custom slash command that extracts session learnings and writes them to knowledge/updates/.',
        status: 'To build',
        install: null,
        why: 'Institutionalizes knowledge. Prevents rediscovering the same bugs. Builds project memory over time.',
      },
    ],
  },
  platform: {
    title: 'Platform Infrastructure',
    subtitle: 'Supporting systems that keep development running 24/7',
    icon: '🏗️',
    tools: [
      {
        name: 'Claude Squad',
        score: 4.75,
        stars: 5000,
        description: 'TUI for managing multiple Claude sessions with git worktree isolation per session.',
        status: 'Planned',
        install: 'brew install claude-squad',
        why: 'Best-in-class process management. Built-in worktree safety. Active development.',
      },
      {
        name: 'claude-auto-resume',
        score: 4.65,
        stars: 1200,
        description: 'Wraps every Claude session with automatic limit handling and recovery.',
        status: 'Planned',
        install: 'curl -fsSL .../install.sh | bash',
        why: 'Eliminates manual limit babysitting. Proven resilience. Simple wrapper architecture.',
      },
      {
        name: 'runCLAUDErun',
        score: 4.05,
        stars: null,
        description: 'macOS app for nightly scheduling of Claude sessions with cron-like triggers.',
        status: 'Planned',
        install: 'Download macOS app',
        why: 'Native macOS integration. Visual scheduler. Enables true overnight development.',
      },
      {
        name: 'OpenClaw',
        score: 3.55,
        stars: 167000,
        description: 'Monitors blocker file and sends Telegram notifications when AI agents need human input.',
        status: 'Broken (Docker)',
        install: 'Docker containerization',
        why: 'Real-time blocker alerts. Telegram integration. Read-only file monitoring (safe).',
      },
      {
        name: 'tmux Sessions',
        score: 4.55,
        stars: null,
        description: 'Long-running, detachable terminal sessions for isolating concurrent Claude work.',
        status: 'Active',
        install: 'Built-in',
        why: 'Rock-solid stability. Universal availability. Simple, proven pattern.',
      },
      {
        name: 'Subagents',
        score: 4.6,
        stars: null,
        description: 'Native Claude Code feature for spawning specialized sub-agents with model selection.',
        status: 'Active',
        install: 'Built-in',
        why: 'First-party. Model routing. Task delegation primitive for all workflows.',
      },
      {
        name: 'cc-audit',
        score: 4.25,
        stars: 15,
        description: 'Security auditing for Claude Code sessions, scanning for unsafe operations.',
        status: 'Chosen',
        install: 'TBD',
        why: 'Lightweight, focused security scanner. Catches destructive operations before execution.',
      },
    ],
  },
};

export default function StackPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Current Stack
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The recommended tools for autonomous AI development, organized by the five phases of the Holy Grail framework.
            </p>
          </div>
        </div>
      </section>

      {/* Stack Details */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Phase 1 */}
            <StackSection section={stackTools.phase1} />

            {/* Phase 2 */}
            <StackSection section={stackTools.phase2} />

            {/* Phase 3 */}
            <StackSection section={stackTools.phase3} />

            {/* Phase 4 */}
            <StackSection section={stackTools.phase4} />

            {/* Phase 5 */}
            <StackSection section={stackTools.phase5} />

            {/* Platform */}
            <StackSection section={stackTools.platform} />
          </div>

          {/* CTA */}
          <div className="mt-16 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
              See something missing? Know a tool that should be here?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-2xl mx-auto">
              This stack is actively maintained and evolving. If you know of a tool that should be evaluated or have feedback on these choices, get in touch.
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:Adam.Michael.Janes@gmail.com?subject=Pompidou Stack Feedback"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Adam
              </a>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/catalogue"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              ← Browse full catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StackSection({ section }: { section: StackSection }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{section.icon}</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {section.title}
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6 ml-12">
        {section.subtitle}
      </p>

      <div className="space-y-6">
        {section.tools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white dark:bg-gray-950 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {tool.name}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  {tool.score && (
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Score: {tool.score.toFixed(2)}
                    </span>
                  )}
                  {tool.stars && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ⭐ {tool.stars.toLocaleString()} stars
                    </span>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                tool.status === 'Installed' || tool.status === 'Active' || tool.status === 'Enabled'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : tool.status === 'Planned' || tool.status === 'Chosen'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : tool.status.includes('Broken')
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
              }`}>
                {tool.status}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {tool.description}
            </p>

            {tool.install && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 mb-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Installation:
                </p>
                <code className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {tool.install}
                </code>
              </div>
            )}

            {tool.why && (
              <div className="border-l-2 border-blue-500 pl-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Why chosen: </span>
                  {tool.why}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
