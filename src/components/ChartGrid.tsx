import type { ChartThumbnail } from '../types/chart';
import { ChartCard } from './ChartCard';

type ChartGridProps = {
  items: ChartThumbnail[];
  selectedIds: Set<string>;
  onToggle: (item: ChartThumbnail, checked: boolean) => void;
  onOpen: (item: ChartThumbnail) => void;
};

export function ChartGrid({ items, selectedIds, onToggle, onOpen }: ChartGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-sm text-slate-500">
        Select Project Files, generate thumbnails, then choose charts for the feature table.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {items.map((item) => (
        <ChartCard
          key={item.id}
          item={item}
          selected={selectedIds.has(item.id)}
          onToggle={onToggle}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
