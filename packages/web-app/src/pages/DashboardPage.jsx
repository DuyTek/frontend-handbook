import { useState, useMemo, useCallback } from 'react';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useCameras } from '@/hooks/useCameras';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { CameraGrid } from '@/components/dashboard/CameraGrid';
import { debounce } from '@/util/debounce';
import { cn } from '@/lib/utils';

const EMPTY_FILTERS = { search: '', status: '', location: '' };

function formatTime(date) {
  if (!date) return '—';
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function DashboardPage() {
  const { cameras, lastUpdated, isStale, isConnected, refresh } = useCameras();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(0);

  // Debounce only the text search; dropdown changes are instant
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const updateSearch = useMemo(
    () => debounce((val) => setDebouncedSearch(val), 300),
    [],
  );

  const handleFilterChange = useCallback(
    (next) => {
      setFilters(next);
      setPage(0);
      if (next.search !== filters.search) {
        updateSearch(next.search);
      } else {
        setDebouncedSearch(next.search);
      }
    },
    [filters.search, updateSearch],
  );

  const filteredCameras = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return cameras.filter((cam) => {
      if (filters.status && cam.status !== filters.status) return false;
      if (filters.location && cam.location !== filters.location) return false;
      if (term) {
        const haystack = `${cam.id} ${cam.officerName} ${cam.officerId} ${cam.location}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [cameras, filters.status, filters.location, debouncedSearch]);

  return (
    <div className="mx-auto max-w-[1126px] px-8 py-8 max-[1024px]:px-5">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Giám sát Camera</h1>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            {isConnected ? (
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                <Wifi className="h-3.5 w-3.5" />
                Đang kết nối
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-zinc-500">
                <WifiOff className="h-3.5 w-3.5" />
                Mất kết nối
              </span>
            )}
            <span>Cập nhật lúc: {formatTime(lastUpdated)}</span>
            {isStale && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                Dữ liệu cũ
              </span>
            )}
          </div>
        </div>

        <button
          onClick={refresh}
          className={cn(
            'flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted',
            isStale && 'border-amber-400 text-amber-700 dark:text-amber-400',
          )}
          aria-label="Làm mới dữ liệu"
        >
          <RefreshCw className={cn('h-4 w-4', isStale && 'animate-spin')} />
          Làm mới
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <FilterBar cameras={cameras} filters={filters} onChange={handleFilterChange} />
      </div>

      {/* Camera grid */}
      <CameraGrid cameras={filteredCameras} page={page} onPageChange={setPage} />
    </div>
  );
}
