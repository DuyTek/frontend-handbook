import { cn } from '@/lib/utils';

const config = {
  ACTIVE: {
    label: 'Hoạt động',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    dot: 'bg-green-500',
  },
  OFFLINE: {
    label: 'Ngoại tuyến',
    className: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    dot: 'bg-zinc-400',
  },
  DOCKED: {
    label: 'Đã bỏ',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  'LOW BATTERY': {
    label: 'Pin yếu',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
};

export function StatusBadge({ status }) {
  const { label, className, dot } = config[status] ?? config.OFFLINE;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dot)} />
      {label}
    </span>
  );
}
