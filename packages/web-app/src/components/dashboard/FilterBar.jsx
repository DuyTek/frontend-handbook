import { useMemo } from 'react';
import { cn } from '@/lib/utils';

const STATUSES = ['ACTIVE', 'OFFLINE', 'DOCKED', 'LOW BATTERY'];

const selectClass = cn(
  'h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground',
  'focus:outline-none focus:ring-2 focus:ring-ring/50',
);

export function FilterBar({ cameras, filters, onChange }) {
  const locations = useMemo(
    () => [...new Set(cameras.map((c) => c.location))].sort(),
    [cameras],
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="search"
        placeholder="Tìm theo ID, tên, địa điểm..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className={cn(selectClass, 'min-w-[220px] flex-1')}
        aria-label="Tìm kiếm camera"
      />

      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className={selectClass}
        aria-label="Lọc theo trạng thái"
      >
        <option value="">Tất cả trạng thái</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={filters.location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
        className={selectClass}
        aria-label="Lọc theo địa điểm"
      >
        <option value="">Tất cả địa điểm</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}
