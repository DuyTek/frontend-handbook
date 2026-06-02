import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';

export function CameraCard({ camera, className }) {
  return (
    <div
      className={cn(
        'grid grid-cols-[6rem_1fr_1fr_1fr_7rem] items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:bg-muted/40',
        className,
      )}
    >
      <span className="font-mono font-medium text-foreground">{camera.id}</span>
      <span className="truncate text-muted-foreground">{camera.location}</span>
      <span className="truncate text-foreground">{camera.officerName}</span>
      <span className="font-mono text-xs text-muted-foreground">{camera.officerId}</span>
      <StatusBadge status={camera.status} />
    </div>
  );
}
