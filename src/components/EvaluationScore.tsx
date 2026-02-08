/**
 * Evaluation Score Component
 * Visual display for tool evaluation scores with color coding
 */

interface EvaluationScoreProps {
  score: number;
  label?: string;
}

export default function EvaluationScore({ score, label = 'Evaluation Score' }: EvaluationScoreProps) {
  // Clamp score to 0-100 range
  const normalizedScore = Math.max(0, Math.min(100, score));

  // Color coding based on score
  const getScoreColor = (value: number): string => {
    if (value >= 80) return 'text-green-600 dark:text-green-400';
    if (value >= 60) return 'text-blue-600 dark:text-blue-400';
    if (value >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBarColor = (value: number): string => {
    if (value >= 80) return 'bg-green-600 dark:bg-green-500';
    if (value >= 60) return 'bg-blue-600 dark:bg-blue-500';
    if (value >= 40) return 'bg-yellow-600 dark:bg-yellow-500';
    return 'bg-red-600 dark:bg-red-500';
  };

  const scoreColor = getScoreColor(normalizedScore);
  const barColor = getBarColor(normalizedScore);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className={`text-2xl font-bold ${scoreColor}`}>
          {normalizedScore}/100
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${normalizedScore}%` }}
        />
      </div>
    </div>
  );
}
