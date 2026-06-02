import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CameraCard } from './CameraCard';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 10;

/*
 * Option A — Pagination (implemented here)
 * Slices the filtered array into pages of PAGE_SIZE. Only PAGE_SIZE DOM
 * nodes are rendered at any time regardless of total camera count.
 *
 * Option B — IntersectionObserver infinite scroll (not implemented, but
 * straightforward): render a sentinel <div ref={sentinelRef}> below the
 * last card. In a useEffect attach an IntersectionObserver to sentinelRef;
 * when it enters the viewport call setVisibleCount(n => n + PAGE_SIZE).
 * Slice cameras to visibleCount instead of page-based slicing.
 */

function pageButtonClass(active) {
  return cn(
    'flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors',
    active
      ? 'bg-primary text-primary-foreground'
      : 'border border-border hover:bg-muted text-muted-foreground',
  );
}

export function CameraGrid({ cameras, page, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(cameras.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const slice = cameras.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const tableHeaderClass = 'text-xs font-medium uppercase tracking-wide text-muted-foreground';

  return (
    <div className="flex flex-col gap-2">
      {/* Column headers */}
      <div className="grid grid-cols-[6rem_1fr_1fr_1fr_7rem] items-center gap-4 px-4 pb-1">
        <span className={tableHeaderClass}>ID</span>
        <span className={tableHeaderClass}>Địa điểm</span>
        <span className={tableHeaderClass}>Tên cảnh sát</span>
        <span className={tableHeaderClass}>Mã NV</span>
        <span className={tableHeaderClass}>Trạng thái</span>
      </div>

      {slice.length === 0 ? (
        <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          Không tìm thấy camera nào phù hợp với bộ lọc.
        </div>
      ) : (
        slice.map((cam) => <CameraCard key={cam.id} camera={cam} />)
      )}

      {/* Pagination */}
      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {cameras.length === 0
            ? '0 camera'
            : `${safePage * PAGE_SIZE + 1}–${Math.min((safePage + 1) * PAGE_SIZE, cameras.length)} / ${cameras.length} camera`}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(0, safePage - 1))}
            disabled={safePage === 0}
            className={pageButtonClass(false)}
            aria-label="Trang trước"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i)
            .filter((i) => i === 0 || i === totalPages - 1 || Math.abs(i - safePage) <= 1)
            .reduce((acc, i, idx, arr) => {
              if (idx > 0 && i - arr[idx - 1] > 1) acc.push('…');
              acc.push(i);
              return acc;
            }, [])
            .map((item, idx) =>
              item === '…' ? (
                <span key={`ellipsis-${idx}`} className="px-1">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => onPageChange(item)}
                  className={pageButtonClass(item === safePage)}
                  aria-label={`Trang ${item + 1}`}
                  aria-current={item === safePage ? 'page' : undefined}
                >
                  {item + 1}
                </button>
              ),
            )}

          <button
            onClick={() => onPageChange(Math.min(totalPages - 1, safePage + 1))}
            disabled={safePage >= totalPages - 1}
            className={pageButtonClass(false)}
            aria-label="Trang sau"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
