import { Phase, Status, Category } from '@/types/tool';

interface BadgeProps {
  label: string;
  variant: 'phase' | 'status' | 'category';
  value?: Phase | Status | Category;
}

export default function Badge({ label, variant, value }: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';

  // Color coding by variant
  const getVariantClasses = () => {
    if (variant === 'status') {
      switch (value) {
        case Status.CHOSEN:
          return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
        case Status.CANDIDATE:
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        case Status.REJECTED:
          return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        default:
          return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      }
    }

    if (variant === 'phase') {
      switch (value) {
        case Phase.SPEC_IT:
          return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
        case Phase.TASK_IT:
          return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
        case Phase.BUILD_IT:
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        case Phase.VERIFY_IT:
          return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300';
        case Phase.LEARN_IT:
          return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
        case Phase.PLATFORM:
          return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
        default:
          return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      }
    }

    // Category: neutral color
    return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
  };

  return (
    <span className={`${baseClasses} ${getVariantClasses()}`}>
      {label}
    </span>
  );
}
